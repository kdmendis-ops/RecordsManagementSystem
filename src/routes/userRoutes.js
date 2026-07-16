const router = require('express').Router();
const controller = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
router.use(protect); router.get('/', authorize('admin'), controller.getUsers); router.get('/:id', controller.getUser); router.patch('/:id', controller.updateUser); router.delete('/:id', controller.deleteUser);
module.exports = router;
