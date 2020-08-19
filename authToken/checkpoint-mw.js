const jwt = require('jsonwebtoken');

const secretLock = require("../config/secretLock.js");

module.exports = (req, res, next) => {
    // add code here to verify users are logged in
    const token = req.headers.authorization;
    console.log(token);
    //if token is available
    if (token) {
        jwt.verify(token, secretLock.jwtSecret, (error, decodeToken) => {
            if (error) {
                console.log(error);
                // token not valid or was modified
                res.status(401).json({ you: "shall not pass!" });
            } else {
                // token is good and we have access to the information inside
                req.decodeToken = decodeToken;
                next();
            }
        })
        // if token is unavailable
    } else {
        res.status(401).json({ message: "Please provide credentials" });
    }
};