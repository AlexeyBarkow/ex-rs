const express = require('express');
const app = express();
const router = require('./app/config/routes.js');
const mongoose = require('mongoose');
const users = require('./app/controllers/users.js');
const articles = require('./app/controllers/articles.js');


function dropAllTables() {
    mongoose.connection.collections['users']
        .drop()
        .then(()=>{console.log("deleted")})
        .catch((e)=>{console.log("error", e)});
    mongoose.connection.collections['articles']
        .drop()
        .then(()=>{console.log("deleted")})
        .catch((e)=>{console.log("error", e)});
}
//

mongoose.connect('mongodb://localhost:27017/lamernews_db');
app.use(router);

// console.log(webpackConfig)

app.listen(3000, 'localhost');


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', () => {
// //     dropAllTables();
// //     var newOne = users.addNewUser('Tom', '0112358', 'ex@mail.ru');
// //     articles.addNewArticle(newOne, 'Test title', 'www.ex.com');
// // });
// dropAllTables();
// app.listen(3000, 'localhost');
// app.get('/', function(req, res) {
//
// })
