const Follow = require('./Follow');
const User = require('./User');

Follow.belongsTo(User, {foreignKey: 'following_id'});
User.hasMany(Follow, {foreignKey: 'following_id'});


module.exports = {
    Follow,
    User
}