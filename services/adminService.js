const Actors = require('./db/actors');
const Users = require('./db/users');



//
// Actor
//
async function getAllActors() {
    return await Actors.getAllActors();
}


//
// User
//
async function getAllUsers() {
    return await Users.getAllUsers();
}

module.exports = {
    getAllActors,
    getAllUsers
};