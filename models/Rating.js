const Sequelize = require("sequelize");
const db = require("../config/database");

const Rating = db.define('ratings', {
    user_id: {
        type: Sequelize.INTEGER
    },
    movie_id: {
        type: Sequelize.INTEGER
    },
    rating: {
        type: Sequelize.INTEGER
    },
    rating_date: {
        type: Sequelize.DATE
    },
    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Rating;