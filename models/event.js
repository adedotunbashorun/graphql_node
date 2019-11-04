'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    title: { type: String, required: true, index: { unique: true, dropDups: true } },
    description: { type: String, required: true },
    price:{ type: Number, required: true },
    date: { type: Date, default: new Date() }
}, { timestamps: true })

module.exports = mongoose.model('Event', EventSchema)