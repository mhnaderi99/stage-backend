const Sequelize = require("sequelize");
const db = require("../config/database");

const Actor = db.define('actors', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    createdat: {
        type: Sequelize.DATE
    },
    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Actor;