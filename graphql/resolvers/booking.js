const Booking = require('../../models/booking');
const { transformBooking, singleEvent } = require('./merge');
const { userVerified } = require('./../../helpers/is-verified');

module.exports = {

    bookings: async(args, req) => {
        try {
            userVerified(req);
            let bookings = await Booking.find();
            return bookings.map(async(booking) => {
                return await transformBooking(booking);
            });
        } catch (error) {
            throw error;
        }
    },

    bookEvent: async (args, req) => {
        try {
            userVerified(req);
            let fetchEvent  = await singleEvent(args.eventID);
            if(!fetchEvent) throw new Error("Event Does Not Exist");
    
            let booking = new Booking({
                user: "5dc157c4c5b93107a7194b94",
                event: fetchEvent
            });
    
            await booking.save();
    
            return await transformBooking(booking);
        } catch (error) {
            throw error
        }
        
    },

    cancelBooking: async (args, req) => {
        try {
            userVerified(req);
            const booking = await Booking.findById(args.bookingID).populate('event');
            const event =  await transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingID});
            return event;
        } catch (error) {
            throw error
        }
        
    }
}