const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Director = require('../../models/Director');
const Sequelize = require("sequelize");


function getAllDirectors() {
    return Director.findAll()
        .then((directors) => { return directors; })
        .catch(err => {
            console.log(err);
            return null;
        });
}


module.exports = {
    getAllDirectors
};