'use strict';
const Article = require('../models/article.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js')

function sendSingleArticle (req, res, next) {
    if (req.get('Content-Type')) {
        Article.find({
            _id: req.params.id
        }).populate([{
            path: 'author',
            select: 'username'
        },
        {
            path: 'comments',
            select: 'text answerTo author creationDate',
            populate: {
                path: 'author',
                select: 'username'
            }
        }]).then(found => {
            console.log('found', found);
            if (found) {
                res.json(found[0]);
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
    if (req.isAuthenticated()) {
        const articleId = req.params.id;
        Article.findById(articleId).then(found => {
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

        res.status(401).json({
            message: 'not authenticated'
        });
    }
}

function sendArticles (req, res, next) {
    if (req.get('Content-Type')) {
        const startIndex = req.params.startIndex;
        const count = req.params.count > 10 ? 10 : req.params.count;
        const sort = req.query.sort;
        let comparator = {};

        switch (sort) {
            case 'top':
                comparator['rateCount'] = -1;
                break;
            case 'latest':
            default:
                comparator['creationDate'] = -1;
                break;
        }
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
            Article.populate(articles, {
                path: 'author',
                select: 'username'
            }).then(articles => {
                let selectedArticles = [];
                if (articles.length > startIndex) {
                    selectedArticles = articles.slice(startIndex, + startIndex + ( + count));
                }
                res.json({
                    articles: selectedArticles,
                    totalLength: articles.length
                });
            }).catch(err => {
                console.log('error', err);
            });
        }).catch(e => {
            res.status(500).json({
                message: e
            });
            console.log('error', e)
        });
    } else {
        next();
    }
}

function sendRandomArticle (req, res) {
    Article.find({}).populate('author', 'username').then(articles => {
        let article = {};
        if (articles.length > 0) {
            article = articles[Math.trunc(articles.length * Math.random())];
        }

        res.json(article);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'error'
        });
    });
};

function createNewArticle (req, res) {
    if (req.isAuthenticated()) {
        let article = new Article({
            author: req.user,
            title: req.body.title,
            link: req.body.link,
            rating: [],
            creationDate: new Date(),
            comments: []
        });
        console.log(article);
        article.save().then((success) => {
            res.json({
                'message' : 'success'
            });

        }).catch((error) => {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({
                'message' : 'can\'t create new article'
            });
        });
    } else {
        res.status(401).json({
            message: 'not authenticated'
        });
    }
}

function updateArticle (req, res) {
    if (req.isAuthenticated()) {
        Article.findById(req.params.id).then(article => {
            if (article) {
                if ('' + article.author === '' + req.user._id) {
                    const title = req.body.title;
                    const link = req.body.link;
                    let newArticle = {};
                    if (title) {
                        article.title = title;
                    }
                    if (link) {
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

                res.status(404).json({
                    'message' : 'can\'t find article with following id'
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500);
        });
    } else {
        res.status(401).json({
            message: 'not authenticated'
        });
    }
};
function deleteArticle (req, res) {
    if (req.isAuthenticated()) {
        Article.findOne( {
            _id: req.params.id,
            author: req.user
        }).remove().exec().then(success => {
            res.json(success);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    }
};

module.exports = {
    sendArticles,
    sendRandomArticle,
    createNewArticle,
    updateArticle,
    deleteArticle,
    like,
    sendSingleArticle
}
