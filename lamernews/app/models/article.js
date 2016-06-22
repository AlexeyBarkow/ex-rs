'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var user = require()
var articleSchema = Schema({
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
var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
