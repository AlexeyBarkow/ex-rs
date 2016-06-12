const User = require('../models/user.js');

function addNewUser(username, password, email) {
    var user = new User({
        username: username,
        password: password,
        email: email,
        registrationDate: new Date()
    });
    return user.save();
    // console.log(user.id);
}

function updateUser(username, newUsername, newPassword, newEmail) {
    var newData = {};
    if (newUsername) {
        newData['username'] = newUsername;
    }
    if (newPassword) {
        newData['password'] = newPassword;
    }
    if (newEmail) {
        newData['email'] = newEmail;
    }
    return User.update({ username }, {$set : newData});
}

function getUserByUsername(username) {
    return userPromise = User.findOne({
        username: username.toLowerCase()
    }, 'username email registrationDate');
}

function deleteUser(username) {
    return User.findOne({ username }).remove().exec();
}
// function isValidPassword()

module.exports = {
    addNewUser,
    getUserByUsername,
    updateUser,
    deleteUser
    // isValidPassword
}
