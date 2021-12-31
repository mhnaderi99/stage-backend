const Director = require('./Director');
const Follow = require('./Follow');
const Movie = require('./Movie');
const User = require('./User');
const Comment = require('./Comment');

Follow.belongsTo(User, {foreignKey: 'following_id'});
User.hasMany(Follow, {foreignKey: 'following_id'});

Movie.belongsTo(Director, {foreignKey: 'director_id'});
Director.hasMany(Movie, {foreignKey: 'director_id'});


Comment.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Comment, {foreignKey: 'user_id'});

Comment.belongsTo(Movie, {foreignKey: 'movie_id'});
Movie.hasMany(Comment, {foreignKey: 'movie_id'});


module.exports = {
    Follow,
    User,
    Movie,
    Director,
    Comment
}