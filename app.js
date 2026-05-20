const express = require('express');

const app = express();

// Health check — no auth, no DB, returns static 200
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'movi-app-backend' });
});

// Root, just so hitting the base URL says something
app.get('/', (req, res) => {
  res.status(200).json({ message: 'movi-app-backend is running' });
});

module.exports = app;
//yes