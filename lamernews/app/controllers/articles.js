'use strict';
const Article = require('../models/article.js');
const User = require('../models/user.js')
// function addNewArticle(author, title, link) {
//     var article = new Article({
//         author: author,
//         title: title,
//         link: link,
//         rating: 0,
//         creationDate: new Date()
//     });
//     return article.save();
//     // return article.id;
// }
// function ratingComparator(a, b) {
//     return a.rating - b.rating;
// }
// function dateComparator(a, b) {
//     return a.creationDate - b.creationDate;
// }
// function noSort() {
//     return 1;
// }

function sendSingleArticle (req, res, next) {
    if (req.get('Content-Type') || req.params.id === 'random') {
        console.log('req',req.params.id);
        Article.findById(req.params.id).then(found => {
            console.log('found', found);
            if (found) {
                found = found.toObject();
                console.log(found);
                found.rateCount = found.rating.length;
                User.findById(found.author).then(author => {
                    if (author) {
                        found.username = author.username;
                    }
                    res.json(found);
                }).catch(err => {
                    console.log(err)
                    res.send(500).json({message: err});
                });
            } else {
                res.send(404).json({
                    message: 'article not found'
                });
            }
        })
    } else {
        next();
    }
}
function like (req, res) {
    // console.log('liking...',req.params.id)
    if (req.isAuthenticated()) {
        const articleId = req.params.id;
        Article.findById(articleId).then(found => {
            // console.log('found!',found);
            if (found) {
                const index = found.rating.indexOf(req.user.id);
                if (index === -1) {
                    found.rating.push(req.user.id);
                } else {
                    found.rating.splice(index, 1);
                }
                found.save();
                res.json({
                    message: index === -1 ? 'liked' : 'disliked'
                });
            } else {
                res.send(404).json({
                    message: 'article not found'
                });
            }
        }).catch(err => {
            res.status(500).json({
                message: err
            })
        });
    } else {
        // console.log('nope');
        res.status(401).json({
            message: 'not authenticated'
        })
    }
}

function sendArticles (req, res, next) {

    //should return json array with list of count articles starting from startIndex sorted in sort order (latest|top)
    // console.log(req);
    if (req.get('Content-Type')) {
        var startIndex = req.params.startIndex;
        var count = req.params.count > 10 ? 10 : req.params.count;
        var sort = req.query.sort;

        // console.log(req.query);
        // console.log(startIndex, count, sort);
        var comparator = {};
        switch (sort) {
            case 'top':
                comparator['rateCount'] = -1;
                break;
            case 'latest':
            default:
                comparator['creationDate'] = -1;
                break;
        }
        console.log('aggregating');
        Article.aggregate([
            {
                $project: {
                    '_id': 1,
                    'author': 1,
                    'title': 1,
                    'rateCount': {$size: '$rating'},
                    'rating': 1,
                    'link': 1,
                    'creationDate': 1

                }
            },
            {
                $sort: comparator
            }
        ]).exec().then(articles => {
            // Articles.find(articles)
            // articles.forEac
            // console.log(startIndex, count, sort, articles);
            let selectedArticles = [];
            let promises = [];
            if (articles.length > startIndex) {
                // var comparator = dateComparator;

                // console.log(articles)
                selectedArticles = articles.slice(startIndex, + startIndex + ( + count));

                selectedArticles.forEach((curr, index) => {
                    promises.push(User.findById(curr.author).then(author => {
                        // console.log('rrreeesss', curr, author, curr.author);
                        if (author) {
                            selectedArticles[index].username = author.username;
                        } else {
                            selectedArticles[index].username = "user deleted";
                            selectedArticles[index].author = "0";
                        }
                    }));
                });

                // console.log(startIndex, + startIndex + count)
                // console.log(selectedArticles);
                // console.log(req.params);
            }
            Promise.all(promises).then(_ => {
                // console.log('selected', selectedArticles);
                // res.setHeader('Content-Type', 'application/json');
                res.json({
                    articles: selectedArticles,
                    totalLength: articles.length
                });
            }).catch(err => {
                console.log('lolwtf');
                res.status(500).json({
                    message: err
                });
            });

        }).catch(e => {
            res.status(500).json({
                message: e
            });
            console.log('error', e)
        });
        // Article.aggregate([
        //     {
        //         $project: {
        //             'author': 1,
        //             'rateCount': {$size: 'rating'},
        //             'rating': 1,
        //             'link': 1,
        //             'creationDate': 1
        //
        //         }
        //     }
        // ]).sort(comparator).then(articles => {
        //     console.log(startIndex, count, sort);
        //     var selectedArticles = [];
        //     if (articles.length > startIndex) {
        //         // var comparator = dateComparator;
        //
        //         // console.log(articles)
        //         selectedArticles = articles.slice(startIndex, + startIndex + count);
        //         // console.log(startIndex, + startIndex + count)
        //         // console.log(selectedArticles);
        //         // console.log(req.params);
        //     }
        //     res.setHeader('Content-Type', 'application/json');
        //     res.send(JSON.stringify(selectedArticles));
        // }).catch(error => {
        //     console.log(error);
        //     res.sendStatus(500);
        // });
    } else {
        next();
    }
};
function sendRandomArticle (req, res) {
    // Article.find({}).populate('author').exec().then(res => {
    //     console.log('res', res)
    // }).catch(err => {
    //     console.log('err', err)
    // })
    Article.aggregate({
        $project: {
            '_id': 1,
            'author': 1,
            'title': 1,
            'rateCount': {$size: '$rating'},
            'rating': 1,
            'link': 1,
            'creationDate': 1

        }
    }).exec().then(articles => {
        // res.setHeader('Content-Type', 'application/json');
        var article = {};
        if (articles.length > 0) {
            article = articles[Math.trunc(articles.length * Math.random())];
        }
        // res.send(JSON.stringify(article));
        res.json(article);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'error'
        });
    });
    //should return random article
    // res.sendStatus(501);
};
// 
// function getAllUserArticles (req, res) {
//     // console.log(req);
//     // console.log(req.params)
//     User.findOne({
//         username: req.params.username.toLowerCase()
//     }).then(user => {
//         Article.find({
//             author: user._id
//         }).then(articles => {
//             // console.log(articles);
//             res.json(articles);
//         })
//     });
// }

function createNewArticle (req, res) {
    // articles.addNewArticle()
    //should create new article
    if (req.isAuthenticated()) {
        // console.log(req.user);
        // var author = req.user;
        // var title = req.body.title;
        // var link = req.body.link;
        var article = new Article({
            author: req.user,
            title: req.body.title,
            link: req.body.link,
            rating: [],
            creationDate: new Date()
        });
        console.log(article);
        article.save().then((success) => {
            console.log(success);

            // res.redirect('/articles/')
            // res.redirect('/');
            res.json({
                'message' : 'success'
            });

        }).catch((error) => {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({
                'message' : 'can\'t create new article'
            });
            // res.send(JSON.stringify({
            //     'error' : 'can\'t create new article'
            // }));
        });
    } else {
        res.status(401).json({
            message: 'not authenticated'
        });
    }
        // return article.save();
    // article.save();
    // res.sendStatus(404);
};
function updateArticle (req, res) {
    if (req.isAuthenticated()) {
        // console.log(req.user.id, req.params.id)
        // User.findOne(req.user.id).then(user => {console.log(user)})

        Article.findById(req.params.id).then(article => {
            // console.log(article.author === req.user._id, req.user._id, article.author,
            // '' + article.author === '' + req.user._id, + req.user._id, '' + req.user._id);
            if (article) {
                if ( '' + article.author === '' + req.user._id) {
                    var title = req.body.title;
                    var link = req.body.link;
                    var newArticle = {};
                    if (title) {
                        // newArticle['title'] = title;
                        article.title = title;
                    }
                    if (link) {
                        // newArticle['link'] = link;
                        article.link = link;
                    }
                    article.save();
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        message : 'success'
                    });
                } else {
                    res.status(403).json({
                        message: 'attemption to change another\'s user account'
                    });
                }

            } else {
                // res.setHeader('Content-Type', 'application/json');
                res.status(404).json({
                    'message' : 'can\'t find article with following id'
                });
            }

        }).catch(error => {
            console.log(error);
            res.status(500);
        })


    } else {
        res.status(401).json({
            message: 'not authenticated'
        });
    }
    //should update existing article
    // res.sendStatus(404);
};
function deleteArticle (req, res) {
    if (req.isAuthenticated()) {
        Article.findOne( {
            _id: req.params.id,
            author: req.user
        }).remove().exec().then(success => {
            console.log('success', success);
            res.setHeader('Content-Type', 'application/json');
            res.json(success);
        }).catch(error => {
            console.log(error);
            res.status(500);
        });
    }
    //should delete existing article
    // res.sendStatus(404);
};

module.exports = {
    sendArticles,
    sendRandomArticle,
    createNewArticle,
    updateArticle,
    deleteArticle,
    like,
    sendSingleArticle
    // getAllUserArticles
}
