const Sequelize = require("sequelize");
const db = require("../config/database");

const Listing = db.define('listings', {
    movie_id: {
        type: Sequelize.INTEGER
    },
    list_id: {
        type: Sequelize.INTEGER
    },
    priority: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Listing;