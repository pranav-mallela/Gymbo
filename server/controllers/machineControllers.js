const Machine = require('../models/machineModel');
const mongoose = require('mongoose');

const getAllMachines = async (req, res) => {
    const allMachines = await Machine.find({}).sort({createdAt: -1});
    try
    {
        res.status(200).json(allMachines);
    }
    catch(error)
    {
        res.status(400).json({error: error.message});
    }
}

const addMachine = async (req, res) => {
    const {name, quantity} = req.body;
    try
    {
        const machine = await Machine.create({name, quantity});
        res.status(200).json(machine);
    }
    catch(error)
    {
        res.status(400).json({error: error.message});
    }
}

const modifyMachine = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(400).json({error: "No such machine found"})
    }
    const machine = await Machine.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!machine) res.status(400).json({error: "No such machine found"});
    else res.status(200).json(machine);
}

const deleteMachine = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(400).json({error: "No such machine found"})
    }
    const machine = await Machine.findOneAndDelete({_id: id});
    if(!machine) res.status(400).json({error: "No such machine found"});
    else res.status(200).json(machine);
}

module.exports = {
    getAllMachines,
    addMachine,
    modifyMachine,
    deleteMachine
}