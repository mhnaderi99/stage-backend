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


function searchMovies(searchTerm) {
    return Asc.Movie.findAll({
        attributes: ["id", "title", "category_id", "year", [Sequelize.literal("director.firstname || ' ' || director.lastname"), "director"]],
        include: [{
            model: Asc.Director,
            required: true,
            attributes: []
        }],
        where: {
            [Sequelize.Op.or]: [{
                '$title$': {
                    [Sequelize.Op.iLike]: "%" + searchTerm + "%"
                }
            },
            {
                '$director.firstname$': {
                    [Sequelize.Op.iLike]: "%" + searchTerm + "%"
                }
            },
            {
                '$director.lastname$': {
                    [Sequelize.Op.iLike]: "%" + searchTerm + "%"
                }
            }
        ]
        },
        raw: true,
    })
        .then((movies) => { return movies; })
        .catch(err => {
            console.log(err);
            return null;
        });
}


module.exports = {
    getAllMovies,
    searchMovies
};