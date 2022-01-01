const Actors = require('./db/actors');
const Users = require('./db/users');
const Follows = require('./db/follows');
const OTP = require('./db/otp');
const Movies = require('./db/movies');
const Comments = require('./db/comments');

var nodemailer = require('nodemailer');


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

    var code = (Math.floor(Math.random() * 9000) + 1000).toString();
    const newOTP = {"email": emailAddress, "code": code};
    const createdOTP = await OTP.generateOTP(newOTP);
    if (createdOTP != null) {
        // send email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'stage.application.helper@gmail.com',
              pass: 'P@$$W0rD'
            }
          });
          
          var mailOptions = {
            from: 'stage.application.helper@gmail.com',
            to: emailAddress,
            subject: 'Stage One-Time Login Code',
            text: `Your one-time login code to Stage is ${code}.\nPlease enter this code in the application.`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
            
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

    
    return await Follows.getFollowings(userId);
}

async function getFollowers(userId) {

    return await Follows.getFollowers(userId);
}

async function follow(follower_id, following_id) {
    return await Follows.follow(follower_id, following_id);
}

async function unfollow(follower_id, following_id) {
    return await Follows.unfollow(follower_id, following_id);
}

async function sendComment(userId, movieId, commentText) {
    var newComment = {user_id: userId, movie_id: movieId, comment_text: commentText};
    return await Comments.sendComment(newComment);
}

async function getAllComments() {

    const comments = await Comments.getAllComments();
    return comments;
}

async function getTimelineComments(userId) {

    const comments = await Comments.getTimelineComments(userId);
    return comments;
}

async function getMovieById(movieId) {

    const movies = await Movies.getMovieById(movieId);
    if (movies.length < 1) {
        return []
    } else {
        return movies;
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

async function getMovieComments(movieId) {

    const comments = await Comments.getMovieComments(movieId);
    return comments
}

async function checkFollow(userId1, userId2) {

    const result = await Follows.checkFollow(userId1, userId2);
    return result[0];
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
    getTimelineComments,
    getMovieById,
    getUserById,
    getUserComments,
    getMovieComments,
    follow,
    checkFollow,
    unfollow,
    sendComment
};