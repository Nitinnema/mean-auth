const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String, require: true},
    phone: {type: String, require: true},
    email: {type: String, require: true},
    car: {type: String, require: true}
});

module.exports = mongoose.model('Users', UserSchema);
