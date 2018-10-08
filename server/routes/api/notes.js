const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();
router.use(expressValidator());

const noteController = require('../../controllers/noteController');

router.post('/notes',noteController.createNewNote);
// router.get('/notes',noteServices.displayNotes);
// router.delete('/notes/:id',noteServices.removeNote);
// router.put('/notes/:id',noteServices.updateNote);
// router.post('/sharenote',noteServices.shareNote);

module.exports = router;