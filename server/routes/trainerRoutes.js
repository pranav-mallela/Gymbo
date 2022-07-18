const express = require('express');
const router = express.Router();
const {
    getAllTrainers,
    getTrainer,
    addTrainer,
    modifyTrainerJoinees,
    modifyTrainerMachines
} = require('../controllers/trainerController');

router.get('/', getAllTrainers);
router.get('/:id', getTrainer);
router.post('/', addTrainer);
router.patch('/:id/joinee', modifyTrainerJoinees);
router.patch('/:id/machine', modifyTrainerMachines);

module.exports = router;