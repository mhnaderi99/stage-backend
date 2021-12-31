const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const User = require('../../models/User');
const Sequelize = require("sequelize");


router.get('/', (req, res) => {
    User.findAll()
        .then((users) => { console.log(users) })
        .catch(err => console.log(err));
    res.sendStatus(200);
});


function createUser(newUser) {
    return User.create(newUser)
        .then((user) => { return user; })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function auth(username, password) {
    return User.findAll({
        where: { email: username, id: password } 
        })
        .then((user) => {
            // console.log(user);
            return user;
        })
        .catch(err => {
            console.log(err);
            return null;
        })
}

function getAllUsers() {

    return User.findAll()
        .then((users) => { return users; })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function getUserById(userId) {
    return User.findAll({
        attributes: ["id", "username"],
        where: {
            "id": userId
        }
    })
        .then((users) => { return users; })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function searchUsers(searchTerm) {

    return User.findAll({
        where: {
            username: {
                [Sequelize.Op.iLike]: "%" + searchTerm + "%"
            }
        }
    })
        .then((users) => { return users; })
        .catch(err => {
            console.log(err);
            return null;
        });
}


function checkEmailAddress(emailAddress) {
    return User.findAll({
        attributes: ["id", "username"],
        where: {
            email: emailAddress
        }
    })
    .then((users) => {return users;})
    .catch(err => {
        console.log(err);
        return null;
    })
}


module.exports = {
    auth,
    createUser,
    getAllUsers,
    searchUsers,
    checkEmailAddress,
    getUserById
};