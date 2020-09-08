var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const authJwt = require('../router/verifyJwtToken');
router.use(bodyParser.json());
var User = require('../service/User');

/**
 * /api/user/
 * Require to be logged in and admin
 * Get all users informations
 */
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], function (req, res) {
    User.getUsers(function (err, rows) {
        if (err) {
            return res.status(500).send({ reason: err.message });
        }
        if (!rows) {
            return res.status(404).send({ reason: 'Users not found.' });
        }
        else {
            res.json(rows);
        }
    });
});

/**
 * /api/user/me
 * Require to be logged in
 * Get current user informations by token informations
 */
router.get('/me', authJwt.verifyToken, function (req, res) {
    let user = null;
    // get user
    User.getUserById(req.userId, (err, users) => {
        if (err)
            return res.status(500).send({ reason: err.message });

        if (users[0])
            user = users[0];

        if (!user)
            return res.status(404).send({ reason: 'User not found.' });

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            avatar_url: user.avatar_url
        });

    });
});

/**
 * /api/user/by-username/:username
 * Require to be logged in and admin
 * Get user informations by username
 */
router.get('/by-username/:username', [authJwt.verifyToken, authJwt.isAdmin], function (req, res) {
    const username = req.params.username;
    var user = null;
    User.getUser(username, function (err, rows) {
        if (err) {
            return res.status(500).send({ reason: err.message });
        }
        if (rows[0]) {
            user = rows[0];
        }
        if (!user) {
            return res.status(404).send({ reason: 'User not found.' });
        }
        else {
            res.json(user);
        }
    });
});

router.post('/', function (req, res) {
    User.createUser(req.body, function (err, count) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

module.exports = router;