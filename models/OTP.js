const Sequelize = require("sequelize");
const db = require("../config/database");

const OTP = db.define('otps', {
    email: {
        type: Sequelize.STRING
    },
    request_date: {
        type: Sequelize.DATE
    },
    expire_date: {
        type: Sequelize.DATE
    },
    code: {
        type: Sequelize.STRING
    },
    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = OTP;