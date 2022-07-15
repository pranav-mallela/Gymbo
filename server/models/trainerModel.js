const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    joinees: [{
        type: Schema.Types.ObjectId,
        ref: 'Joinee'
    }],
    machines: [{
        type: Schema.Types.ObjectId,
        ref: 'Machine'
    }]
}, {timestamps: true});

const Trainer = mongoose.model('Trainer', trainerSchema);
module.exports = Trainer;