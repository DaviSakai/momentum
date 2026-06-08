const goalModel = require('../models/goalModel');

/**
 * Get goal summary for dashboard.
 */
function getGoalSummary(userId) {
  return goalModel.getSummary(userId);
}

module.exports = { getGoalSummary };
