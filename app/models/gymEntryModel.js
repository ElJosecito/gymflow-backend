const mongoose = require('mongoose');

const gymEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    entryTime: { type: Date, default: Date.now },
    exitTime: { type: Date },
}, { timestamps: true });

const GymEntry = mongoose.model('GymEntry', gymEntrySchema);
module.exports = GymEntry;
