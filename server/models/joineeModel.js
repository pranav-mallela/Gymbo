const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joineeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    }
}, {timestamps: true});

//IMP: pluralised model name is searched for in DB collections
const Joinee = mongoose.model('Joinee', joineeSchema);
module.exports = Joinee;