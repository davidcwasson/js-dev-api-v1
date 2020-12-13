// Bring in the express server and create application
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

// Use the express Router object
const router = express.Router();

// Create GET to return a list of books
router.get('/', (req, res) => {
  res.send('Catcher in the Rye');
});

// Configure router so all routes are prefixed with /api
app.use('/api/', router);

// Create server to listen to port provided
app.listen(port, () => {
  console.log(`Node server is running on http://localhost:' ${port}`);
});
