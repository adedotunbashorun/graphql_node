
const User = require('../../models/user');
const { transformUser } = require('./merge');
const { userVerified } = require('./../../helpers/is-verified');

module.exports = {

    users: async(args, req) => {
        try {
            userVerified(req);
            let users = await User.find();

            return users.map(async(user) => {
                return await transformUser(user);
            });
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

            return await transformUser(user);
        } catch (error) {
            throw error;
        }
        
    },

    login:  async({email, password}) => {
        try {
            const user = await User.findOne({ email: email});
            if(!user) throw new Error('User with this email address does not exist');

            if (!user.isValid(password)) {
                throw new Error('Incorrect password.');
            }
            let token = user.generateJWT();

            return {
                userId: user.id,
                token: token,
                email: user.email,
                tokenExpiration: 1
            }
        } catch (error) {
            throw error
        }
    },
}