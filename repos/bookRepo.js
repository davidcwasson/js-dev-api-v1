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
  delete: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let books = JSON.parse(data);
        let index = books.findIndex(p => p.id == id);
        if (index != -1) {
          books.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(books), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(index);
            }
          })
        }
      }
    });
  },
  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let books = JSON.parse(data);
        books.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(books), function (err) {
          if (err) {
            reject(err);
          }
          else {
            resolve(newData);
          }
        });
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
  },
  update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let books = JSON.parse(data);
        let book = books.find(p => p.id == id);
        if (book) {
          Object.assign(book, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(books), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(newData);
            }
          });
        }
      }
    });
  }
};

module.exports = bookRepo;
