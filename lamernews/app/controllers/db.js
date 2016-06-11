
const mongoose = require('mongoose');

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

module.exports = {
    dropAllTables
}
