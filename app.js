// Bring in the express server and create application
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Use the express Router object
const router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());
app.use(express.urlencoded()); // Parse URL-encoded bodies

// Book data stored via files
const bookRepo = require('./repos/bookRepo.js');

const errorHelper = require('./helpers/errorHelpers');

// Local MongoDB BooksAPI collection
const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use('/api/', bookRouter);

// Create GET to return a list of books
router.get('/', (req, res, next) => {
  bookRepo.get((data) => {
    res.status(200).json({
      status: 200,
      statusText: 'OK',
      message: 'All books retrieved.',
      data
    });
  }, (err) => {
    next(err);
  });
});

router.post('/', (req, res, next) => {
  bookRepo.insert(req.body, (data) => {
    res.status(201).json({
      status: 201,
      statusText: 'Created',
      message: 'New Book Added.',
      data
    });
  }, (err) => {
    next(err);
  });
});

// Create GET/search?id=n&name=str to search for books by 'id' and/or 'name'
router.get('/search', (req, res, next) => {
  const searchObject = {
    id: req.query.id,
    name: req.query.name
  };

  bookRepo.search(searchObject, (data) => {
    res.status(200).json({
      status: 200,
      statusText: 'OK',
      message: 'All Books retrieved.',
      data
    });
  }, (err) => {
    next(err);
  });
});

// Create GET/id to return a single book
router.get('/:id', (req, res, next) => {
  bookRepo.getById(req.params.id, (data) => {
    if (data) {
      res.status(200).json({
        status: 200,
        statusText: 'OK',
        message: 'Single book retrieved.',
        data
      });
    } else {
      res.status(404).json({
        status: 404,
        statusText: 'Not Found',
        message: `The book '${req.params.id}' could not be found.`,
        error: {
          code: 'NOT_FOUND',
          message: `The book '${req.params.id}' could not be found.`
        }
      });
    }
  }, (err) => {
    next(err);
  });
});

router.put('/:id', (req, res, next) => {
  bookRepo.getById(req.params.id, (data) => {
    if (data) {
      // Attempt to update the data
      bookRepo.update(req.body, req.params.id, (data) => {
        res.status(200).json({
          status: 200,
          statusText: 'OK',
          message: `Book '${req.params.id}' updated.`,
          data
        });
      });
    } else {
      res.status(404).json({
        status: 404,
        statusText: 'Not Found',
        message: `The book '${req.params.id}' could not be found.`,
        error: {
          code: 'NOT_FOUND',
          message: `The book '${req.params.id}' could not be found.`
        }
      });
    }
  }, (err) => {
    next(err);
  });
});

router.patch('/:id', (req, res, next) => {
  bookRepo.getById(req.params.id, (data) => {
    if (data) {
      // Attempt to update the data
      bookRepo.update(req.body, req.params.id, (data) => {
        res.status(200).json({
          status: 200,
          statusText: 'OK',
          message: `Book '${req.params.id}' patched.`,
          data
        });
      });
    } else {
      res.status(404).json({
        status: 404,
        statusText: 'Not Found',
        message: `The book '${req.params.id}' could not be found.`,
        error: {
          code: 'NOT_FOUND',
          message: `The book '${req.params.id}' could not be found.`
        }
      });
    }
  }, (err) => {
    next(err);
  });
});

router.delete('/:id', (req, res, next) => {
  bookRepo.getById(req.params.id, (data) => {
    if (data) {
      // Attempt to delete the data
      bookRepo.delete(req.params.id, (data) => {
        res.status(200).json({
          status: 200,
          statusText: 'OK',
          message: `The book '${req.params.id}' is deleted.`,
          data: `Book '${req.params.id}' deleted.`
        });
      });
    } else {
      res.status(404).json({
        status: 404,
        statusText: 'Not Found',
        message: `The book '${req.params.id}' could not be found.`,
        error: {
          code: 'NOT_FOUND',
          message: `The book '${req.params.id}' could not be found.`
        }
      });
    }
  }, (err) => {
    next(err);
  });
});

// Configure router so all routes are prefixed with /api
app.use('/api/', router);

// Configure exception logger to console
app.use(errorHelper.logErrorsToConsole);
// Configure exception logger to file
app.use(errorHelper.logErrorsToFile);
// Configure client error handler
app.use(errorHelper.clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHelper.errorHandler);

// Create server to listen to port provided
app.listen(port, () => {
  console.log(`Node server is running on http://localhost:' ${port}`);
});
