'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: { type: String, required: true, index: { unique: true, dropDups: true } },
    description: { type: String, required: true },
    price:{ type: Number, required: true },
    date: { type: Date, set: setNewDate, get: getDate },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

function setNewDate(date) {
    return new Date(date);
}

function getDate(date) {
    return new Date(date).toISOString();
}

class EventClass{

}

EventSchema.loadClass(EventClass);
module.exports = mongoose.model('Event', EventSchema)