const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user.model');

module.exports = async function(req, res, next) {

    const token = req.headers['x-access-token'] || req.headers.authorization;

    if (!token)
        return res.status(401).send('UnAuthenticated, please go to /auth/login');

    try {
        const raw = String(req.headers.authorization).split(' ').pop();

        const { id } = jwt.verify(raw, config.get('SECRET'));

        req.user = await User.findById(id);
        next();

    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
}