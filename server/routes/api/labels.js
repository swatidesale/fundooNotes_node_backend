const express = require('express');
const router = express.Router();

const labelServices = require('../../services/labelServices');

router.post('/labels',labelServices.createLabel);
router.get('/labels',labelServices.displayLabels);
router.delete('/labels/:id',labelServices.removeLabel);
router.put('/labels/:id',labelServices.updateLabel);

module.exports = router;