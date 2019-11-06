const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('./merge');
const { userVerified } = require('./../../helpers/is-verified');

module.exports = {
    events: async(args, req) => {
        try {
            // userVerified(req);
            let events = await Event.find();
            return events.map(async(event) => {
                return await transformEvent(event);
            });
        } catch (error) {
            throw error;
        }
    },

    createEvent: async(args,req) => {
        try {
            userVerified(req);
            const event =  new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date,
                creator: req.userId
            });

            await event.save();

            let createdEvent = await transformEvent(event);

            let creator = await User.findOne({_id: req.userId});
            creator.createdEvents.push(event._doc);
            await creator.save();

            return createdEvent;
        } catch (error) {
            throw error;
        }
    },
}