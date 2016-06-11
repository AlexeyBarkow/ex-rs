const User = require('../models/user.js');

function addNewUser(username, password, email) {
    var user = new User({
        username: username,
        password: password,
        email: email,
        registrationDate: new Date()
    });
    user.save().then((data) => {
        console.log("success", data);
    }).catch((error) => {
        console.log(error);
    });
    // console.log(user.id);
    return user.id;
}

// function isValidPassword()

module.exports = {
    addNewUser,
    isValidPassword
}
