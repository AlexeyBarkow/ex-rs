'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var user = require()
const commentSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    creationDate: Date,
    aswerTo: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        // default: 
    }

    // comments

});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
