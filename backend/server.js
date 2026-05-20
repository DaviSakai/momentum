require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./src/database/connection');
const { runMigrations } = require('./src/database/migrator');
const routes = require('./src/routes');
const { errorHandler } = require('./src/middlewares/errorHandler');
const { notFoundHandler } = require('./src/middlewares/notFoundHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// --- Routes ---
app.use('/api', routes);

// --- Error Handling ---
app.use(notFoundHandler);
app.use(errorHandler);

// --- Start Server ---
async function start() {
  try {
    // Initialize database and run migrations
    initializeDatabase();
    runMigrations();

    app.listen(PORT, () => {
      console.log(`[Momentum API] Server running on http://localhost:${PORT}`);
      console.log(`[Momentum API] Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('[Momentum API] Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
