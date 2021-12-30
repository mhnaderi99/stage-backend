const Sequelize = require("sequelize");
const db = require("../config/database");

const Comment = db.define('comments', {
    user_id: {
        type: Sequelize.INTEGER
    },
    movie_id: {
        type: Sequelize.INTEGER
    },
    comment_date: {
        type: Sequelize.DATE
    },
    comment_text: {
        type: Sequelize.STRING
    },
    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Comment;