let fs = require('fs');

const FILE_NAME = './assets/books.json';

let bookRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let book = JSON.parse(data).find(p => p.id == id);
        resolve(book);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let books = JSON.parse(data);
        // Perform search
        if (searchObject) {
          // Example search object
          // let searchObject = {
          //   "id": 1,
          //   "name": 'A'
          // };
          books = books.filter(
            b => (searchObject.id ? b.id == searchObject.id : true) &&
              (searchObject.name ? b.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true));
        }

        resolve(books);
      }
    });
  }
};

module.exports = bookRepo;
