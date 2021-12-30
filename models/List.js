const Sequelize = require("sequelize");
const db = require("../config/database");

const List = db.define('lists', {
    creator_id: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    creation_date: {
        type: Sequelize.DATE
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

module.exports = List;