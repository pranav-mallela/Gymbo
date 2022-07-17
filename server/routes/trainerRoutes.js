const express = require('express');
const router = express.Router();
const {
    getAllTrainers,
    getTrainer,
    addTrainer,
    addJoineeToTrainer,
    addMachineToTrainer
} = require('../controllers/trainerController');

router.get('/', getAllTrainers);
router.get('/:id', getTrainer);
router.post('/', addTrainer);
router.patch('/:id/joinee', addJoineeToTrainer);
router.patch('/:id/machine', addMachineToTrainer);

module.exports = router;