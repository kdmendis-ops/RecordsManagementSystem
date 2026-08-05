// User account endpoints. All routes require login; listing all users is admin-only
// (fine-grained "own account vs admin" checks happen in the controller).
const router = require('express').Router();
const controller = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
router.use(protect); router.get('/', authorize('admin'), controller.getUsers); router.get('/:id', controller.getUser); router.patch('/:id', controller.updateUser); router.delete('/:id', controller.deleteUser);
module.exports = router;
