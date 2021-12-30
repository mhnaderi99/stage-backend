const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Category = require('../../models/Category');
const Sequelize = require("sequelize");


function getAllCategories() {
    return Category.findAll()
        .then((categories) => { return categories; })
        .catch(err => {
            console.log(err);
            return null;
        });
}


module.exports = {
    getAllCategories
};