'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
      
        return jwt.sign({
          email: this.email,
          id: this._id,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'GRAPHQL');
    }
}

UserSchema.loadClass(UserClass);
module.exports = mongoose.model('User', UserSchema)