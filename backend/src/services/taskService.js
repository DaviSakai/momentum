const taskModel = require('../models/taskModel');

/**
 * Get task summary for dashboard.
 */
function getTaskSummary(userId) {
  return taskModel.getSummary(userId);
}

module.exports = { getTaskSummary };
