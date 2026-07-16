const router = require('express').Router();
const controller = require('../controllers/responseController');
const { protect } = require('../middleware/auth');
router.post('/', controller.createResponse); router.get('/survey/:surveyId', protect, controller.getResponses);
module.exports = router;
