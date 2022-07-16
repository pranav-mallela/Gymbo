const mongoose = require('mongoose');
const Trainer = require('../models/trainerModel');

const getAllTrainers = async (req, res) => {
    const allTrainers = await Trainer.find({}).sort({updatedAt: -1});
    try{
        res.status(200).json(allTrainers);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const getTrainer = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({error: 'Could not find trainer'})
    }
    const trainerData = await Trainer.findById(id);
    if(!trainerData) res.status(400).json({error: "Could not find trainer"});
    else res.status(200).json(trainerData);
}

const addTrainer = async (req, res) => {
    const { name, phone, password, joinees, machines } = req.body;
    try{
        const newTrainer = await Trainer.create({ name, phone, password, joinees, machines });
        res.status(200).json({newTrainer});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const modifyTrainer = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({error: 'Could not find trainer'})
    }
    const trainer = await Trainer.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if(!trainer) res.status(400).json({error: "Could not find trainer"});
    else res.status(200).json(trainer);
}

module.exports = {
    getAllTrainers,
    getTrainer,
    addTrainer,
    modifyTrainer
}