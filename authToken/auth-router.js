const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("../users2/user-model.js");
const { isValid } = require("../users2/user-service.js");
const secretLock = require("../config/secretLock.js");

router.post("/register", (req, res) => {
    const credentials = req.body;
    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 6;
        // hashing the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;

        // save the user to database
        Users.add(credentials)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('username: ', username);
    console.log('password: ', password);
    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                // compare the password the hash stored in the database
                console.log('password: ', password);
                console.log('user:', user);
                if (user && bcryptjs.compareSync(password, user.password)) {

                    // create a token for an user when logging
                    const token = generateToken(user);
                    res.status(200).json({
                        message: "Welcome to our API",
                        token,
                    });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

function generateToken(user)  {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    };
    const secret = secretLock.jwtSecret;
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, secret, options);
}

module.exports = router;
