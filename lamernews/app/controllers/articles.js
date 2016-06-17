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
function sendArticles (req, res) {

    //should return json array with list of count articles starting from startIndex sorted in sort order (latest|top)
    // console.log(req);

    var startIndex = req.params.startIndex;
    var count = req.params.count;
    var sort = req.query.sort;
    var comparator = {};
    switch (sort) {
        case 'top':
            comparator['rating'] = 1;
            break;
        case 'latest':
            comparator['creationDate'] = 1;
            break;
    }

    Article.find({}).sort(comparator).then(articles => {
        console.log(startIndex, count, sort);
        var selectedArticles = [];
        if (articles.length > startIndex) {
            // var comparator = dateComparator;


            selectedArticles = articles.slice(startIndex, startIndex + count);
            // console.log(req.params);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(selectedArticles));
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
};
function sendRandomArticle (req, res) {
    Article.find({}).then(articles => {
        res.setHeader('Content-Type', 'application/json');
        var article = {};
        if (articles.length > 0) {
            article = articles[Math.trunc(articles.length * Math.random())];
        }
        res.send(JSON.stringify(article));
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
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
            rating: 0,
            creationDate: new Date()
        });
        console.log(article);
        article.save().then((success) => {
            console.log(success);

            // res.redirect('/articles/')
            res.redirect('/');

        }).catch((error) => {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                'error' : 'can\'t create new article'
            }));
        });
    } else {
        res.sendStatus(401);
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
                    res.send(JSON.stringify({
                        'status' : 'success'
                    }));
                } else {
                    res.sendStatus(403);
                }

            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    'error' : 'can\'t find article with following id'
                }));
            }

        })).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })


    } else {
        res.sendStatus(401);
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
            res.send(JSON.stringify(success));
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
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
