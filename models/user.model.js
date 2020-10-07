const mongoose = require('mongoose');
const config = require('config');


const Joi = require('joi');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,

        set(val) {

            // 该方法为 mongoose 对 password 字段的 set 方法，每次对其赋值时都会调用
            // 由于要对密码进行密文存储，所以要进行散列值计算
            return bcrypt.hashSync(val, 10);
        }
    },
    isAdmin: Boolean
});

const User = mongoose.model('User', new mongoose.Schema(schema));

function validateUser(user) {

    // 类似于 asp.net 中的 ModelState 验证？

    const spec = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    });

    // 网上的示例多为 Joi.validate(user,spec)
    // 但是根据其官方文档显示，上面的接口已经弃用
    return spec.validate(user);
}


module.exports = { User, validate: validateUser };