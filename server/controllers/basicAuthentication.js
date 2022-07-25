const mongoose = require('mongoose');
const Trainer = require('../models/trainerModel');

const basicAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log(authorization);
    if(!authorization)
    {
        return res.status(403).send({message: "Forbidden"});
    }
    const encoded = authorization.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    const [phone, password] = decoded.split(':');
    const authenticatedUser = await Trainer.findOne({phone: phone, password: password});
    if(!authenticatedUser || authenticatedUser._id != req.params.id)
    {
        return res.status(403).send({message: "Forbidden"});
    }
    next();
}

module.exports={
    basicAuth
}