const express = require('express');
const router = express.Router();
const {
    addJoinee,
    getAllJoinees
} = require('../controllers/manageController');

// Get the list of all joinees and their info
router.get('/', getAllJoinees);

// Post new joinee info to the DB
router.post('/', addJoinee);

module.exports = router;
