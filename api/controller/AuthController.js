var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const config = require('../config/config');
const verifySignUp = require('../router/verifySignUp');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
let User = require('../service/User');

/**
 * /auth/register
 * Register user + log
 */
router.post('/register', [verifySignUp.checkDuplicateUserNameOrEmail], function (req, res) {

    if (req.body.username == null || req.body.email == null || req.body.username == null)
        return res.status(400).send({ reason: "Please enter good informations to register."});
    

    User.createUser({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        avatar_url: req.body.avatar_url,
        id_role: 1
    }, (err, rows) => {
        if (err) {
            return res.status(500).send({ reason: err.message });
        }
        User.getUser(req.body.username, function (err, rows) {
            let user = null;

            if (err) {
                return res.status(500).send({ reason: err.message });
            }

            if (rows[0]) {
                user = rows[0];
            }

            //check if user exist
            if (!user) {
                return res.status(404).send({ reason: 'User not found.' });
            }

            // get user's role
            User.getRoleById(user.id_role, (err, rows) => {
                let role = null;
                if (err) {
                    return res.status(500).send({ reason: err.message });
                }

                if (rows[0]) {
                    role = rows[0];
                }

                if (!role) {
                    return res.status(404).send({ reason: 'Role not found.' });
                }

                let authorities = role.name.toUpperCase();

                // create token
                var token = jwt.sign({ id: user.id, role: authorities }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });

                return res.status(200).send({
                    auth: true,
                    accessToken: token,
                    user: { username: user.username, email: user.email, avatar_url: user.avatar_url },
                    authorities: authorities
                });
            });

        });
    });
});

/**
 * /auth/login
 * Check credentials and generate token
 */
router.post('/login', function (req, res) {

    User.getUser(req.body.username, function (err, rows) {
        let user = null;

        if (err) {
            return res.status(500).send({ reason: err.message });
        }

        if (rows[0]) {
            user = rows[0];
        }

        //check if user exist
        if (!user) {
            return res.status(404).send({ reason: 'User not found.' });
        }

        //check password validity
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, reason: 'Invalid password.' });
        }

        // get user's role
        User.getRoleById(user.id_role, (err, rows) => {
            let role = null;
            if (err) {
                return res.status(500).send({ reason: err.message });
            }

            if (rows[0]) {
                role = rows[0];
            }

            if (!role) {
                return res.status(404).send({ reason: 'Role not found.' });
            }

            let authorities = role.name.toUpperCase();

            // create token
            var token = jwt.sign({ id: user.id, role: authorities }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            return res.status(200).send({
                auth: true,
                accessToken: token,
                user: { username: user.username, email: user.email, avatar_url: user.avatar_url },
                authorities: authorities
            });
        });

    });
});

module.exports = router;