const express = require('express');
const router = express.Router();
const {
    getAllTrainers,
    getTrainer,
    addTrainer,
    modifyTrainer
} = require('../controllers/trainerController');

router.get('/', getAllTrainers);
router.get('/:id', getTrainer);
router.post('/', addTrainer);
router.patch('/:id', modifyTrainer);

module.exports = router;