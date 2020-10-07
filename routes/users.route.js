const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user.model');
const express = require('express');
const router = express.Router();

router.get('/profile', auth, async(req, res) => {
    return res.send(req.user);
})

router.post('/register', async(req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('User already registered!');
    }

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    await user.save();

    res.status(201).send(user);
});

module.exports = router;