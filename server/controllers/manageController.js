const Joinee = require('../models/joineeModel');

const addJoinee = async (req, res) => {
    const {name, phone, startDate, endDate} = req.body
    try{
        const newJoinee = await Joinee.create({name, phone, startDate, endDate})
        res.status(200).json({newJoinee})
    } 
    catch (err){
        res.status(400).json({error: err.message})
    }
}

const getAllJoinees = async (req,res) => {
    const allJoinees = await Joinee.find({}).sort({createdAt: -1});
    try{
        res.status(200).json(allJoinees);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    addJoinee,
    getAllJoinees
}