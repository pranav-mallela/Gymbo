const express = require('express');
const router = express.Router();
const {
    getAllTrainers,
    getTrainer,
    addTrainer,
    trainerLogin,
    modifyTrainerJoinees,
    modifyTrainerMachines
} = require('../controllers/trainerController');
const { basicAuth } = require('../controllers/basicAuthentication');

router.get('/', getAllTrainers);
router.get('/:id', basicAuth, getTrainer);
router.post('/', addTrainer);
router.post('/login', trainerLogin)
router.patch('/:id/joinee', basicAuth, modifyTrainerJoinees);
router.patch('/:id/machine', basicAuth, modifyTrainerMachines);

module.exports = router;