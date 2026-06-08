const express = require('express');
const healthRoutes = require('./healthRoutes');
const authRoutes = require('./authRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const checkinRoutes = require('./checkinRoutes');
const goalRoutes = require('./goalRoutes');
const taskRoutes = require('./taskRoutes');

const router = express.Router();

// --- Feature Routes ---
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/checkins', checkinRoutes);
router.use('/goals', goalRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;

