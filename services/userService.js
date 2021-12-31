const Actors = require('./db/actors');
const Users = require('./db/users');
const Follows = require('./db/follows');
const OTP = require('./db/otp');
const Movies = require('./db/movies');
const Comments = require('./db/comments');



async function signup(userInfo) {
    let createdUser = await Users.createUser(userInfo);
    if (createdUser == null) {
    } else {
        userInfo = {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email
        }
        return userInfo;
    }
    
    return null;
}

async function checkEmail(emailAddress) {

    const users = await Users.checkEmailAddress(emailAddress);
    if (users.length != 1) {
        return {found:false, id: null, username: null};

    } else {
        return {found: true, id: users[0].id, username: users[0].username};
    }
}

async function generateOTP(emailAddress) {

    const newOTP = {"email": emailAddress, "code": "1234"};
    const createdOTP = await OTP.generateOTP(newOTP);
    if (createdOTP != null) {
        return { stat: true, message: "successfuly generated OTP" };
    } else {
        return { stat: true, message: "could not generate OTP" };
    }
}

async function deleteOTP(emailAddress) {

    const deletedOTP = await OTP.deleteOTP(emailAddress);
    if (deletedOTP != null) {
        return { stat: true, message: "successfuly deleted OTP" };
    } else {
        return { stat: true, message: "could not delete OTP" };
    }
}


async function validateOTP(emailAddress, code) {

    const validation = await OTP.validateOTP(emailAddress, code);
    if (validation.length < 1) {
        return { stat: true, message: "incorrect" };
    }
    else {
        return { stat: true, message: "correct" };
    }
}

async function getAllMovies() {
    const movies = await Movies.getAllMovies();
    return movies;
}

async function searchMovies(searchTerm) {
    const movies = await Movies.searchMovies(searchTerm);
    return movies;
}

async function searchUsers(searchTerm) {
    const users = await Users.searchUsers(searchTerm);
    return users;
}


async function getFollowings(userId) {

    return Follows.getFollowings(userId);
}

async function getFollowers(userId) {

    return Follows.getFollowers(userId);
}


async function getAllComments() {

    const comments = await Comments.getAllComments();
    return comments;
}

async function getMovieById(movieId) {

    const movies = await Movies.getMovieById(movieId);
    if (movies.length < 1) {
        return []
    } else {
        return movies[0];
    }
}

async function getUserById(userId) {

    const users = await Users.getUserById(userId);
    if (users.length < 1) {
        return []
    } else {
        return users[0];
    }
}

async function getUserComments(userId) {

    const comments = await Comments.getUserComments(userId);
    return comments
}



module.exports = {
    getFollowings,
    getFollowers,
    checkEmail,
    generateOTP,
    deleteOTP,
    validateOTP,
    signup,
    getAllMovies,
    searchMovies,
    searchUsers,
    getAllComments,
    getMovieById,
    getUserById,
    getUserComments
};