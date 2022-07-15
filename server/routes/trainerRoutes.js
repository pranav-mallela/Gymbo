const express = require('express');
const router = express.Router();
const {
    getAllTrainers,
    addTrainer,
    modifyTrainer
} = require('../controllers/trainerController');

router.get('/', getAllTrainers);
router.post('/', addTrainer);
router.patch('/:id', modifyTrainer);

module.exports = router;