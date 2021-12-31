const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Movie = require('../../models/Movie');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const Sequelize = require("sequelize");
const Asc = require("../../models/associations")


function getAllComments() {
    const query = `select movies.id, movies.title, users.username, comments.comment_text from comments inner join users on comments.user_id = users.id inner join movies on comments.movie_id = movies.id`
    return db.query(query,
        { raw: true, type: db.QueryTypes.SELECT })
}


function getUserComments(userId) {
    const query = `select movies.id,
    movies.title,
    users.username,
    comments.comment_text 
    from comments inner join users on comments.user_id = users.id inner join movies on comments.movie_id = movies.id
    where users.id = ${userId}`;
    return db.query(query,
        { raw: true, type: db.QueryTypes.SELECT })
}


function getMovieComments(movieId) {
    const query = `select movies.id,
    movies.title,
    users.username,
    comments.comment_text 
    from comments inner join users on comments.user_id = users.id inner join movies on comments.movie_id = movies.id
    where movies.id = ${movieId}`;
    return db.query(query,
        { raw: true, type: db.QueryTypes.SELECT })
}


module.exports = {
    getAllComments,
    getUserComments,
    getMovieComments
};