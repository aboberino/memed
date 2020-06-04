var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const config = require('../config/config');
const verifySignUp = require('../router/verifySignUp');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
let User = require('../service/User');

router.post('/signup', [verifySignUp.checkDuplicateUserNameOrEmail], function (req, res) {
    User.createUser({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        avatar_url: req.body.avatar_url
    }, (err, rows) => {
        if (err){
            return res.status(500).send({ reason: err.message });
        }
        return res.send({ message: 'Registered successfully!' });
    });
});

router.post('/signin', function (req, res) {

    User.getUser(req.body.username, function (err, rows) {
        let user = null;

        if (err) {
            return res.status(500).send({ reason: err.message });
        }
        
        if (rows[0]){
            user = rows[0];
        }

        //check if user exist
        if (!user) {
            return res.status(404).send({ reason: 'User Not Found.' });
        }

        //check password validity
        // let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        // if (!passwordIsValid) {
        //     return res.status(401).send({ auth: false, accessToken: null, reason: 'Invalid Password!' });
        // }

        if (req.body.password !== user.password) {
            return res.status(401).send({ auth: false, accessToken: null, reason: 'Invalid Password!' });
        }

        // create token
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // get user's role
        let authorities = "ROLE_" + user.username.toUpperCase();
        console.log(authorities);

        return res.status(200).send({
            auth: true,
            accessToken: token,
            username: user.username,
            authorities: authorities
        });
    });
});



module.exports = router;