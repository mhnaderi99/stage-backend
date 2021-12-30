const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Actor = require('../../models/Actor');
const Sequelize = require("sequelize");


function getAllActors() {
    return Actor.findAll()
        .then((actors) => { return actors; })
        .catch(err => {
            console.log(err);
            return null;
        });
}


module.exports = {
    getAllActors
};