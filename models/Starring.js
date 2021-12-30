const Sequelize = require("sequelize");
const db = require("../config/database");

const Starring = db.define('starrings', {
    actor_id: {
        type: Sequelize.INTEGER
    },
    movie_id: {
        type: Sequelize.INTEGER
    },
    priority: {
        type: Sequelize.INTEGER
    },
    createdat: {
        type: Sequelize.DATE
    },
    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Starring;