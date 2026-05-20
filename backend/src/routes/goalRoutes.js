const express = require('express');
const goalController = require('../controllers/goalController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', goalController.list);
router.get('/summary', goalController.summary);
router.get('/:id', goalController.getById);
router.post('/', goalController.create);
router.put('/:id', goalController.update);
router.patch('/:id/progress', goalController.updateProgress);
router.delete('/:id', goalController.remove);

module.exports = router;
