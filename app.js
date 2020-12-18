// Bring in the express server and create application
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Use the express Router object
const router = express.Router();

// Book data stored via files
const bookRepo = require('./repos/bookRepo.js');

// Local MongoDB BooksAPI collection
const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');

// Create GET to return a list of books
router.get('/', (req, res, next) => {
  bookRepo.get(function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "All books retrieved.",
      "data": data
    });
  }, function(err) {
    next(err);
  });
});

// *** MongoDB ***
// Route to /books
// Can filter books by query string
router.route('/books')
  // GET /books
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

// *** MongoDB ***
// Route to a single book
router.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });

// Create GET/search?id=n&name=str to search for books by 'id' and/or 'name'
router.get('/search', function (req, res, next) {
  let searchObject = {
    "id": req.query.id,
    "name": req.query.name
  };

  bookRepo.search(searchObject, function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "All Books retrieved.",
      "data": data
    });
  }, function (err) {
    next(err);
  });
})

// Create GET/id to return a single book
router.get('/:id', function (req, res, next) {
  bookRepo.getById(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Single book retrieved.",
        "data": data
      });
    }
    else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The book '" + req.params.id + "' could not be found.",
        "error": {
          "code": "NOT_FOUND",
          "message": "The book '" + req.params.id + "' could not be found."
        }
      });
    }
  }, function(err) {
    next(err);
  });
});

// Configure router so all routes are prefixed with /api
app.use('/api/', router);

// Create server to listen to port provided
app.listen(port, () => {
  console.log(`Node server is running on http://localhost:' ${port}`);
});
