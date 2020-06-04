const User = require('../service/User');
// const config = require('../config/config');
// const ROLES = config.ROLES;

checkDuplicateUserNameOrEmail = (req, res, next) => {

    User.getUser(req.body.username, (err, rows) => {
        if (err) {
            return res.status(500).send({ reason: err.message });
        }

        if (rows[0]) {
            return res.status(400).send("Fail -> Username is already taken.");
        }

        User.getUserByEmail(req.body.email, (err, rows) => {
            if (err) {
                return res.status(500).send({ reason: err.message });
            }

            if (rows[0]) {
				return res.status(400).send("Fail -> Email is already in use.");
            }
            next();
        });
    });

}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;

module.exports = signUpVerify;