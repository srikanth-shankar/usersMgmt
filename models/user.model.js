const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    pwd: {type: String, required: true},
    isAdminRole: {type: Boolean}
});

module.exports = mongoose.model('User', userSchema);