const express = require('express');
const { getToday, getAll, createOrUpdate, update } = require('../controllers/checkinController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/today', getToday);
router.get('/', getAll);
router.post('/', createOrUpdate);
router.put('/:id', update);

module.exports = router;
