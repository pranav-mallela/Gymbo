const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const machineSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
}, {timestamps:true});

const Machine = mongoose.model('Machine', machineSchema);
module.exports = Machine;
