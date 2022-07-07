const express = require('express');
const router = express.Router();
const {
    modifyJoinee,
    getJoinee,
    deleteJoinee
}  = require('../controllers/profileController');

//GET joinee info
router.get('/:id', getJoinee)

//PATCH joinee info
router.patch('/:id', modifyJoinee)

//DELETE joinee
router.delete('/:id', deleteJoinee);

module.exports = router;