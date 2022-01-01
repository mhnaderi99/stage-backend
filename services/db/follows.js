const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Follow = require('../../models/Follow');
const Sequelize = require("sequelize");
const Asc = require("../../models/associations")


function getFollowings(userId) {

    console.log(`userID: ${userId}`);
    
    const query = `select following_id as id, username from (SELECT follows.following_id 
        from follows inner join users on follows.follower_id = users.id where users.id = ${userId}) as tmp
        inner join users on tmp.following_id = users.id`;
    return db.query(query,
        { raw: true, type: db.QueryTypes.SELECT });

}


function getFollowers(userId) {
    
    const query = `select follower_id as id, username from (SELECT follows.follower_id 
        from follows inner join users on follows.following_id = users.id where users.id = ${userId}) as tmp
        inner join users on tmp.follower_id = users.id;`;
    return db.query(query,
        { raw: true, type: db.QueryTypes.SELECT });

}

function checkFollow(userId1, userId2) {
    const query = `select count(*) from follows where follower_id = ${userId1} and following_id = ${userId2}`;
    return db.query(query,
        { raw: true, type: db.QueryTypes.SELECT });

}

function follow(followerId, followingId) {
    newFollow = {follower_id: followerId, following_id: followingId}
    return Follow.create(newFollow)
        .then((createdFollow) => {
            console.log(createdFollow);
            return createdFollow;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function unfollow(followerId, followingId) {
    newFollow = {follower_id: followerId, following_id: followingId}
    return Follow.destroy({
        where: {
            follower_id: followerId,
            following_id: followingId
        }
    })
        .then((deletedFollow) => {
            console.log(deletedFollow);
            return deletedFollow;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}




module.exports = {
    getFollowings,
    getFollowers,
    follow,
    checkFollow,
    unfollow
};