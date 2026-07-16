const router = require('express').Router();
const controller = require('../controllers/surveyController');
const { protect, authorize } = require('../middleware/auth');
router.get('/', controller.getSurveys); router.get('/:id', controller.getSurvey); router.post('/', protect, authorize('staff', 'admin'), controller.createSurvey); router.patch('/:id', protect, authorize('staff', 'admin'), controller.updateSurvey); router.delete('/:id', protect, authorize('staff', 'admin'), controller.deleteSurvey);
module.exports = router;
