const jsonServer = require('json-server');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Use JSON Server middleware to serve the mock API
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
app.use(middlewares);
app.use('/api', router); // Make your data available under /api route

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
