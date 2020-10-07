const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user.model');

module.exports = async function(req, res, next) {

    // 检查是否携带 token
    const token = req.headers['x-access-token'] || req.headers.authorization;

    if (!token)
        return res.status(401).send('UnAuthenticated, please go to /auth/login');

    try {
        // 验证 jwt token
        const raw = String(req.headers.authorization).split(' ').pop();

        const { id } = jwt.verify(raw, config.get('SECRET'));

        // 将找到的 user 对象添加到 req 中
        // 类似 asp.net 中的 Request.User
        req.user = await User.findById(id);
        next();

    } catch (ex) {
        console.log(ex);
        res.status(400).send("Invalid token.");
    }
}