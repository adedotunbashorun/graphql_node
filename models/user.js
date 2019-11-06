'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true, dropDups: true } },
    password: { type: String, required: true },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
}, { timestamps: true });

class UserClass{

    static hashPassword(password) {
        return bcrypt.hashSync(password, 10)
    }

    isValid  (hashedPassword) {
        return bcrypt.compareSync(hashedPassword, this.password)
    }

    generateJWT () {
        return jwt.sign({
          email: this.email,
          userId: this._id,
        }, 'somesupersecretGRAPHQL', {expiresIn: '1h'});
    }
}

UserSchema.loadClass(UserClass);
module.exports = mongoose.model('User', UserSchema)