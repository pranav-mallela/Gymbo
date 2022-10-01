const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

// static function to register a trainer
trainerSchema.statics.register = async function(name, phone, password, joinees, machines) {
    const exists = await this.findOne({ phone })
    if(exists){
        throw Error('Phone is already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({name, phone, password: hash, joinees, machines})
    return user
}

//static function to login a trainer
trainerSchema.statics.login = async function(phone, password) {
    const user = await this.findOne({ phone })
    if(!user)
    {
        throw Error('Incorrect phone number, please try again')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match)
    {
        throw Error('Incorrect credentials')
    }
    return user
}

const Trainer = mongoose.model('Trainer', trainerSchema);
module.exports = Trainer;