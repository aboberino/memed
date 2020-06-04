var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const config = require('../config/config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
let User = require('../service/User');

router.post('/signup', /*[verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted],*/ function (req, res) {
    // signup
});

router.get('/signin', function (req, res) {

    User.getUser(req.body.username, function (err, rows) {

        if (err) {
            return res.status(500).send({ reason: err.message });
        }
        let user = rows[0];

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