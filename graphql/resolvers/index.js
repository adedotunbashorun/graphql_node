const Event = require('../../models/event');
const User = require('../../models/user');


const events = async(eventIds) => {
    try {
        let events = await Event.find({_id: { $in: eventIds}});
        events.map(async(event) => {
            return {
                ...event._doc,
                _id: event.id,
                creator: await user.bind(this, event._doc.creator)
            }
        })
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

module.exports = {
    events: async() => {
        try {
            let events = await Event.find();
            events.map(async(event) => {
                return {
                    ...event._doc,
                    _id: event.id,
                    creator: user.bind(this, event._doc.creator)
                }
            });
        } catch (error) {
            throw error;
        }
    },

    users: async() => {
        try {
            let users = await User.find();

            users.map(async(user) => {
                return {
                    ...user._doc,
                    _id: user.id,
                    createdEvents: events.bind(this, user._doc.createdEvents)
                }
            });
        } catch (error) {
            throw error;
        }
    },

    createEvent: async(args) => {
        try {
            const event =  new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date,
                creator: "5dc157c4c5b93107a7194b94"
            });

            await event.save();

            let createdEvent = { ...event._doc, creator: user.bind(this, event._doc.creator) };
            let creator = await User.findById("5dc157c4c5b93107a7194b94");
            creator.createdEvents.push(event);
            await creator.save();

            return createdEvent;
        } catch (error) {
            throw error;
        }
    },

    createUser: async(args) => {
        try {
            let check  = await User.findOne({email: args.userInput.email});
            if(check) throw new Error("User Exist");

            const user =  new User({
                email: args.userInput.email,
                password: User.hashPassword(args.userInput.password)
            });

            await user.save();

            return { ...user._doc };
        } catch (error) {
            throw error;
        }
        
    }
}