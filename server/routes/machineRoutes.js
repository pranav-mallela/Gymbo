const express = require('express');
const router = express.Router();
const {
    getAllMachines,
    addMachine,
    modifyMachine,
    deleteMachine
} = require('../controllers/machineControllers');

router.get('/', getAllMachines);
router.post('/', addMachine);
router.patch('/:id', modifyMachine);
router.delete('/:id', deleteMachine);
module.exports = router;