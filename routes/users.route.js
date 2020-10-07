const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user.model');
const express = require('express');
const router = express.Router();

// 获取用户 profile 信息
// 在管道中添加了 auth 中间件，以确保只有登录的用户才可以访问
router.get('/profile', auth, async(req, res) => {
    return res.send(req.user);
})

// 注册用户
router.post('/register', async(req, res) => {

    // 对提交的数据进行验证
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // 检查是否已经有相同用户名的账号注册过
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).send('User already registered!');
    }

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    // 保存到数据库中
    await user.save();


    // 返回 201 以及 user 对象，表示创建成功
    res.status(201).send(user);
});

module.exports = router;