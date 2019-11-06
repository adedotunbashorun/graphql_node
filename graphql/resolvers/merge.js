const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');
const { dateToString } = require('../../helpers/date');

const transformUser = async user => {
    return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
    }
}

const transformEvent = async event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event.date),
        creator: await user.bind(this, event._doc.creator)
    };
}

const transformBooking = async booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: await user.bind(this, booking._doc.user),
        event: await singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking.createdAt),
        updatedAt: dateToString(booking.updatedAt)
    }
}

const events = async(eventIds) => {
    try {
        let events = await Event.find({_id: { $in: eventIds}});
        return events.map(async(event) => {
            return await transformEvent(event);
        })
    } catch (error) {
        throw error 
    }
}

const singleEvent = async(eventId) => {
    try {
        let event = await Event.findById(eventId);
        return await transformEvent(event);
    } catch (error) {
        throw error 
    }
}

const user = async(userId) => {
    try {
        let user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: await events.bind(this, user.createdEvents)
        }
    } catch (error) {
      throw error  
    }
}

const bookings = async() => {
    try {
        let bookings = await Booking.find();
        return bookings.map(async(booking) => {
            return await transformBooking(booking);
        });
    } catch (error) {
        throw error 
    }
}


exports.events = events;
exports.singleEvent = singleEvent;
exports.user = user;
exports.bookings = bookings;
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
exports.transformUser = transformUser;