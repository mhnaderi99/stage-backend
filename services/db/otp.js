const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const OTP = require('../../models/OTP');
const Sequelize = require("sequelize");


function generateOTP(newOTP) {
    return OTP.create(newOTP)
        .then((createdOTP) => {
            return createdOTP;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function deleteOTP(emailAddress) {
    return OTP.destroy({
        where: {
            "email": emailAddress
        }
    })
    .then((deletedOTP) => {
        return deletedOTP;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}

function validateOTP(emailAddress, code) {
    return OTP.findAll({
        where: {
            "email": emailAddress,
            "code": code
        }
    })
    .then((otps) => { return otps; })
        .catch(err => {
            console.log(err);
            return null;
        });
}

module.exports = {
    generateOTP,
    validateOTP,
    deleteOTP
};