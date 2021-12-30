const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define('users', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    createdat: {
        type: Sequelize.DATE
    },
    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = User;