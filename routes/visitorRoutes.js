const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');
const { validateVisitor } = require('../middleware/validation');

router.post('/', validateVisitor, visitorController.createVisitor);
router.get('/', visitorController.getAllVisitors);
router.get('/activity', visitorController.getVisitorActivity);
router.get('/:id', visitorController.getVisitorById);
router.put('/:id', validateVisitor, visitorController.updateVisitor);
router.post('/:id/visit', visitorController.addVisitedAttraction);

module.exports = router;
