const router = require("express").Router();

const Users = require("./user-model.js");
const secretLock = require("../config/secretLock.js");
const checkpointMw = require("../authToken/checkpoint-mw.js");

router.get("/", checkpointMw, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err));
});

// Updating the user with the role
router.put('/:id', checkpointMw, checkrole(['user', 'admin']), (req,res)  => {
    // use req.decodedToken data to restrict access by checking the role
    res.status(200).json({ hello: "you made it!" });
});

function checkrole(roles) {
    return function(req, res, next) {
        roles.forEach(role => {
            if(role.decodeToken === role) {
                next();
            }
        })
        res.status(403).json({ message: "can't touch this, you're forbidden!" });
    }
};

// function checkRole(roles) {
//     return function (req, res, next) {
//         if (roles.includes(req.decodedToken.role)) {
//             next();
//         } else {
//             res.status(403).json({ you: "can't touch this!" });
//         }
//     };
// };

module.exports = router;
