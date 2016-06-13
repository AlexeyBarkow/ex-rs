const Article = require('../models/article.js');

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

function sendArticles (req, res) {

    //should return json array with list of count articles starting from startIndex sorted in sort order (latest|top)
    // console.log(req);
    res.sendStatus(404);
};
function sendRandomArticle (req, res) {

    //should return random article
    res.sendStatus(404);
};
function createNewArticle (req, res) {
    // articles.addNewArticle()
    //should create new article
    if (req.isAuthenticated()) {
        console.log(req.user);
        var author = req.user;
        var title = req.body.title;
        var link = req.body.link;
        var article = new Article({
            author: author,
            title: title,
            link: link,
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
    }
        // return article.save();
    // article.save();
    // res.sendStatus(404);
};
function updateArticle (req, res) {

    //should update existing article
    res.sendStatus(404);
};
function deleteArticle (req, res) {

    //should delete existing article
    res.sendStatus(404);
};

module.exports = {
    sendArticles,
    sendRandomArticle,
    createNewArticle,
    updateArticle,
    deleteArticle

}
