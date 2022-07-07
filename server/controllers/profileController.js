const { default: mongoose } = require('mongoose');
const Joinee = require('../models/joineeModel');

const modifyJoinee = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({error: 'Could not find joinee'})
    }
    const joinee = await Joinee.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!joinee) res.status(400).json({error: "Could not find joinee"})
    else res.status(200).json(joinee);
}

const getJoinee = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({error: 'Could not find joinee'})
    }
    const joineeData = await Joinee.findById(id);
    if(!joineeData) res.status(400).json({error: "Could not find joinee"})
    else res.status(200).json(joineeData);
}

const deleteJoinee = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({error: 'Could not find joinee'})
    }
    const joinee = await Joinee.findOneAndDelete({_id: id});
    if(!joinee) res.status(400).json({error: "Could not find joinee"})
    else res.status(200).json(joinee);
}

module.exports = {
    modifyJoinee,
    getJoinee,
    deleteJoinee
}