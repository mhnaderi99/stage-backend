const Sequelize = require("sequelize");
const db = require("../config/database");

const Movie = db.define('movies', {
    title: {
        type: Sequelize.STRING
    },
    category_id: {
        type: Sequelize.INTEGER
    },
    director_id: {
        type: Sequelize.INTEGER
    },
    summary: {
        type: Sequelize.STRING
    },
    length: {
        type: Sequelize.INTEGER
    },
    year: {
        type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.STRING
    },
    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Movie;