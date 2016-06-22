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
function sendArticles (req, res, next) {

    //should return json array with list of count articles starting from startIndex sorted in sort order (latest|top)
    // console.log(req);
    if (req.get('Content-Type')) {
        var startIndex = req.params.startIndex;
        var count = req.params.count > 10 ? 10 : req.params.count;
        var sort = req.query.sort;

        // console.log(req.query);
        console.log(startIndex, count, sort);
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
                    '_id': 0,
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
            // console.log(startIndex, count, sort, articles);
            var selectedArticles = [];
            if (articles.length > startIndex) {
                // var comparator = dateComparator;

                console.log(articles)
                selectedArticles = articles.slice(startIndex, + startIndex + ( + count));
                // console.log(startIndex, + startIndex + count)
                // console.log(selectedArticles);
                // console.log(req.params);
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(selectedArticles));
        }).catch(e => {
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
    Article.aggregate({
        $project: {
            '_id': 0,
            'author': 1,
            'title': 1,
            'rateCount': {$size: '$rating'},
            'rating': 1,
            'link': 1,
            'creationDate': 1

        }
    }).exec().then(articles => {
        res.setHeader('Content-Type', 'application/json');
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
        Article.findOne(req.params.id).then((article => {
            if (article) {
                if (article.author === req.user) {
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
                        'status' : 'success'
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

        })).catch(error => {
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
    deleteArticle

}
