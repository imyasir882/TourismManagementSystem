const express = require('express');
const router = express.Router();
const attractionController = require('../controllers/attractionController');
const { validateAttraction } = require('../middleware/validation');

router.post('/', validateAttraction, attractionController.createAttraction);
router.get('/', attractionController.getAllAttractions);
router.get('/top-rated', attractionController.getTopRatedAttractions);
router.get('/:id', attractionController.getAttractionById);
router.put('/:id', validateAttraction, attractionController.updateAttraction);
router.delete('/:id', attractionController.deleteAttraction);

module.exports = router;
