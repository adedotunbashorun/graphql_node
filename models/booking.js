'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    event:{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

class BookingClass{


}

BookingSchema.loadClass(BookingClass);
module.exports = mongoose.model('Booking', BookingSchema)