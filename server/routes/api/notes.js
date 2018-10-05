const express = require('express');
const router = express.Router();

const noteServices = require('../../services/noteServices');

router.post('/notes',noteServices.createNote);
router.get('/notes',noteServices.displayNotes);
router.delete('/notes/:id',noteServices.removeNote);
router.put('/notes/:id',noteServices.updateNote);
router.post('/sharenote',noteServices.shareNote);

module.exports = router;