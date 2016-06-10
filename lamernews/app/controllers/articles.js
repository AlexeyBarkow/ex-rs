const Article = require('../models/article.js');

function addNewArticle(author, title, link) {
    var article = new Article({
        author: author,
        title: title,
        link: link,
        rating: 0,
        creationDate: new Date()
    });
    article.save().then((data) => {
        console.log("success", data);
    }).catch((error) => {
        console.log(error);
    });
    return article.id;
}

module.exports = {
    addNewArticle
}
