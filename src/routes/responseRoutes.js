// Survey response endpoints. Submitting a response is open to anyone (patients
// can respond anonymously); viewing responses for a survey requires login.
const router = require('express').Router();
const controller = require('../controllers/responseController');
const { protect } = require('../middleware/auth');
router.post('/', controller.createResponse); router.get('/survey/:surveyId', protect, controller.getResponses);
module.exports = router;
