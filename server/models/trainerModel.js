const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joineeSchema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
}, {timestamps: true});

const machineSchema = new Schema({
    name:{type: String, required: true},
    quantity:{type: Number, required: true},
}, {timestamps:true});

const trainerSchema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    joinees: [{
        type: joineeSchema,
        default: {}
    }],
    machines: [{
        type: machineSchema,
        default: {}
    }]
}, {timestamps: true});

const Trainer = mongoose.model('Trainer', trainerSchema);
module.exports = Trainer;