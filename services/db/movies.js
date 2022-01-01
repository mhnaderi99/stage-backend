const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Movie = require('../../models/Movie');
const Sequelize = require("sequelize");
const Asc = require("../../models/associations")


function getAllMovies() {
    return Asc.Movie.findAll({
        attributes: ["id", "title", "category_id", "year", [Sequelize.literal("director.firstname || ' ' || director.lastname"), "director"]],
        include: [{
            model: Asc.Director,
            required: true,
            attributes: []
        }],
        raw: true,
    })
        .then((movies) => { return movies; })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function getMovieById(movieId) {
    const query = `select movies.id as id,
    movies.title as title,
    movies.year as year,
    movies.summary as summary,
    movies.length as length,
    categories.name as category,
    concat(directors.firstname, ' ', directors.lastname) as director
    from movies inner join categories on movies.category_id = categories.id inner join directors on movies.director_id = directors.id
    where movies.id = ${movieId}`;
    
    return db.query(query,
        { raw: true, type: db.QueryTypes.SELECT })
}


function searchMovies(searchTerm) {
    const query = `select movies.id as id,
    movies.title as title,
    movies.year as year,
    movies.summary as summary,
    movies.length as length,
    categories.name as category,
    concat(directors.firstname, ' ', directors.lastname) as director
    from movies inner join categories on movies.category_id = categories.id inner join directors on movies.director_id = directors.id
    where movies.title ilike '%${searchTerm}%'`;
    
    return db.query(query,
        { raw: true, type: db.QueryTypes.SELECT })
}




module.exports = {
    getAllMovies,
    searchMovies,
    getMovieById
};