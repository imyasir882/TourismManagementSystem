const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    entryFee: {
        type: Number,
        required: [true, 'Entry fee is required'],
        min: [0, 'Entry fee cannot be negative']
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Attraction', attractionSchema);
