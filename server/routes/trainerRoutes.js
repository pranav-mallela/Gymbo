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
const { requireAuth } = require('../controllers/jwtAuthentication');

router.get('/', getAllTrainers);
router.post('/', addTrainer);
router.post('/login', trainerLogin)

router.use(requireAuth);
// trainer should be authorized before changing any data
router.get('/:id', getTrainer);
router.patch('/:id/joinee', modifyTrainerJoinees);
router.patch('/:id/machine', modifyTrainerMachines);

module.exports = router;