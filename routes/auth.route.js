const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

const { User, validate } = require('../models/user.model');
const SECRET = config.get('SECRET');

router.post('/login', async(req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(404).send('The user not found, please register!');
    }

    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
    );

    if (!isPasswordValid) {
        return res.status(422).send({
            message: "Password is invalid!"
        });
    }

    // 生成 token
    // 不能将 password 存入 token 中
    const token = jwt.sign({
        id: String(user._id)
    }, SECRET);



    return res.send({
        token
    });

});

module.exports = router;