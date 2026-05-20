const express = require('express');
const taskController = require('../controllers/taskController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', taskController.list);
router.get('/summary', taskController.summary);
router.get('/:id', taskController.getById);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.patch('/:id/status', taskController.changeStatus);
router.delete('/:id', taskController.remove);

module.exports = router;
