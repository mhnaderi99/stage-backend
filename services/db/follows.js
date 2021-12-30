const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Follow = require('../../models/Follow');
const Sequelize = require("sequelize");
const Asc = require("../../models/associations")


function getFollowings(userId) {
    
    return Asc.Follow.findAll({
        attributes: [],
        include: [{
            model: Asc.User,
            required: true,
            attributes: ['username']
        }],
        raw: true,
        where: { follower_id: userId }
    })
    .then((followings) => { return followings; })
        .catch(err => {
            console.log(err);
            return null;
        });
    
    // return Follow.findAll({
    //     where: { follower_id: userId }
    // })
    //     .then((followings) => { return followings; })
    //     .catch(err => {
    //         console.log(err);
    //         return null;
    //     });
}


function getFollowers(userId) {
    return Follow.findAll({
        where: { following_id: userId }
    })
        .then((followers) => { return followers; })
        .catch(err => {
            console.log(err);
            return null;
        });
}


module.exports = {
    getFollowings,
    getFollowers
};