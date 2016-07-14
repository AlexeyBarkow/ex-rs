'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var user = require()
const articleSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    link: String,
    rating: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    creationDate: Date,
    // comments

});
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
