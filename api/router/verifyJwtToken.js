const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
let User = require('../service/User');


/**
 * Check if token exist and is valid
 */
verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
	if (!token) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to Authentication. Error: ' + err
			});
		}
		req.userId = decoded.id;
		next();
	});
}

/**
 * Check if role is Admin 
 */
isAdmin = (req, res, next) => {
	let user = null;
	let role = null;

	// get user
	User.getUserById(req.userId, (err, users) => {
		if (err)
			return res.status(500).send({ reason: err.message });

		if (users[0])
			user = users[0];

		if (!user)
			return res.status(404).send({ reason: 'User not found.' });

		// get user role 
		User.getRoleById(user.id_role, (err, roles) => {
			if (err)
				return res.status(500).send({ reason: err.message });

			if (roles[0])
				role = roles[0];

			if (role.name.toUpperCase() === config.ROLES[2]) {
				req.user = user;
				next();
				return;
			}
			res.status(403).send("Require Admin role.");
		});
	});
}

/**
 * Check if role is at least Confirmed or Admin 
 */
isConfirmedOrAdmin = (req, res, next) => {
	let user = null;
	let role = null;

	// get user
	User.getUserById(req.userId, (err, users) => {
		if (err)
			res.status(400).json(err);

		user = users[0];
		// get user role 
		User.getRoleById(user.id_role, (err, roles) => {
			if (err)
				res.status(400).json(err);

			role = roles[0];
			if (role.name.toUpperCase() === config.ROLES[1] || role.name.toUpperCase() === config.ROLES[2]) {
				req.user = user;
				next();
				return;
			}
			res.status(403).send("Require Confirmed or Admin roles.");
		});
	});
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isConfirmedOrAdmin = isConfirmedOrAdmin;

module.exports = authJwt;