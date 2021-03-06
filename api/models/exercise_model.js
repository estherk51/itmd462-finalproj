const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true},
    name: {type: String, required: true},
    duration: {type: Number, required: false},
    reps: {type: Number, required: false},
    date: {type: String, required: false}
});

module.exports = mongoose.model('Exercise', exerciseSchema);