const Sequelize = require("sequelize");
const db = require("../config/database");

const Follow = db.define('follows', {
    follower_id: {
        type: Sequelize.INTEGER
    },
    following_id: {
        type: Sequelize.INTEGER
    },
    follow_date: {
        type: Sequelize.DATE
    },
    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Follow;