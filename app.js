const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const path = require("path");
const btoa = require('btoa');
const port = 3030;
const adminAuth = { login: 'admin', password: 'password' };


// DB
const db = require("../back/config/database");


//services Test
const adminService = require("../back/services/adminService");
const userService = require("../back/services/userService");
const authService = require("../back/services/authenticationService");
const { deleteOTP } = require("./services/db/otp");

db.authenticate().then(() => console.log("Khoda bozorge")).catch(err => console.log("Ghalat kardam " + err.message));

const app = express();
app.use(cors());
app.use(bodyParser.json());

/**
 * 
 * Admin services
 * 
 */

// get all users
app.get('/admin/getAllUsers', async(req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === adminAuth.login && password === adminAuth.password) {
        //Admin access granted
        const users = await adminService.getAllUsers();
        res.send(users);

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }

});

// get all actors
app.get('/admin/getAllActors', async(req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === adminAuth.login && password === adminAuth.password) {
        //Admin access granted
        const actors = await adminService.getAllActors();
        res.send(actors);

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }

});






/**
 * 
 * User services
 * 
 */

//get followings
app.get('/user/getFollowings', async(req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    const authResult = await authService.userAuth(login, password);
    // Verify login and password are set and correct
    if (authResult != null && authResult.length == 1) {
        if (login && password && login === authResult[0].username && password === authResult[0].password) {
            // Access granted...
            const followings = await userService.getFollowings(authResult[0].id);
            res.send(followings);
        }

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }
});


//check email
app.get('/check_email', async(req, res) => {

    const result = await userService.checkEmail(req.query.email);
    res.send(result);
});

//generate OTP
app.post('/generateOTP', async(req, res) => {
    const response = await userService.generateOTP(req.body.email);
    res.send(response);

});

//delete OTP
app.use('/deleteOTP', async(req, res) => {
    const deletedOTP = await userService.deleteOTP(req.body.email);
    res.send(deletedOTP);

});


//validate OTP
app.use('/validateOTP', async(req, res) => {
    const response = await userService.validateOTP(req.query.email, req.query.code);
    res.send(response);

});


//signup
app.post('/signup', async(req, res) => {
    
    const createdUser = await userService.signup(req.body);
    res.send(createdUser);

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});