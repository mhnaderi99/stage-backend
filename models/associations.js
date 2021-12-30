const Director = require('./Director');
const Follow = require('./Follow');
const Movie = require('./Movie');
const User = require('./User');

Follow.belongsTo(User, {foreignKey: 'following_id'});
User.hasMany(Follow, {foreignKey: 'following_id'});

Movie.belongsTo(Director, {foreignKey: 'director_id'});
Director.hasMany(Movie, {foreignKey: 'director_id'});


module.exports = {
    Follow,
    User,
    Movie,
    Director
}