const express = require('express');
const router = express.Router();
const {
    getAllMachines,
    addMachine,
    modifyMachine
} = require('../controllers/machineControllers');

router.get('/', getAllMachines);
router.post('/', addMachine);
router.patch('/:id', modifyMachine);
// router.delete('/', deleteMachine);
module.exports = router;