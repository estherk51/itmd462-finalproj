const mongoose = require('mongoose');

const weight_trackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    initial: {type: Number, required: true},
    goal: {type: Number, required: true},
    current: {type: Number, required: false}
});

module.exports = mongoose.model('Weight_track', weight_trackSchema);