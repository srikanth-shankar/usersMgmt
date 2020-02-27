const User = require('../models/user.model');

const Query = {
    userMgmt: () => "user manamegement",
    getUsers: () => User.find(),
    getUserByName: (root, args) => User.findOne({name: args.name})
}

const Mutation = {
    createUser:  async (root, {name, email, pwd, isAdminRole}) => {
        const user = new User({name, email, pwd, isAdminRole});
        const newUser = await user.save();
        return newUser.id;
    },

    deleteById: async (root, {id}) => {
        result = await User.deleteOne({_id: id});
        return !!result ? 'user deleted' : 'some prob occured';
    }
}

module.exports = {Query, Mutation};