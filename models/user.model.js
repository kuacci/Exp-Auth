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

    return spec.validate(user);
}


module.exports = { User, validate: validateUser };