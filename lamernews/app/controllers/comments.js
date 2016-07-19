'use strict';
const Comment = require('../models/comment.js');
const Article = require('../models/article.js');

function postComment(req, res) {
    if (req.isAuthenticated()) {
        console.log('post', req.params);
        Article.findById(req.params.id).then(article => {
            console.log('article',article);
            if (article) {
                let comment = new Comment({
                    author: req.user,
                    text: req.body.text,
                    answerTo: req.body.answerTo,
                    creationDate: new Date()
                });
                console.log(comment);
                comment.save().then((success) => {
                    article.comments.push(comment._id);
                    article.save();
                    res.json({
                        'message' : 'success'
                    });
                }).catch(err => {
                    res.status(500).json(err);
                });
            } else {
                res.status(404).json({
                    'message' : 'can\'t find article with following id'
                });
            }
        }).catch(err => {
            res.status(404).json(err);
        });
    } else {
        res.status(401).json({
            message: 'not authenticated'
        });
    }
}


function deleteComment(req, res) {
    if (req.isAuthenticated()) {
        console.log('adscnsadkljfg d',req.params);
        Comment.findOne( {
            _id: req.params.commentId,
            author: req.user
        }).remove().exec().then(success => {
            console.log(success.result)
            res.json({
                message: 'success',
                ok: success
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    }
}

module.exports = {
    postComment,
    deleteComment
};
