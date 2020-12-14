const jwt = require('jsonwebtoken');
const clsfd = require('../classified');
const User = require('../models/user');


// Authorization
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // Verifying Token
    if (token) {
        jwt.verify(token, clsfd.secretKey, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
};


// Getting User Info
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    // Verifying Token
    if (token) {
        jwt.verify(token, clsfd.secretKey, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
};


module.exports = { requireAuth, checkUser };