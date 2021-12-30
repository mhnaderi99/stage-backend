const Actors = require('./db/actors');
const Users = require('./db/users');
const Follows = require('./db/follows');
const OTP = require('./db/otp');


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
        return {found:false, id: null};

    } else {
        return {found: true, id: users[0].id};
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


async function getFollowings(userId) {

    return Follows.getFollowings(userId);
}

async function getFollowers(userId) {

    return Follows.getFollowers(userId);
}


module.exports = {
    getFollowings,
    getFollowers,
    checkEmail,
    generateOTP,
    deleteOTP,
    validateOTP,
    signup
};