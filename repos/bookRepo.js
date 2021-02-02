const fs = require('fs');

const FILE_NAME = './assets/books.json';

const bookRepo = {
  get(resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById(id, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // eslint-disable-next-line eqeqeq
        const book = JSON.parse(data).find((p) => p.id == id); // === does not work
        resolve(book);
      }
    });
  },
  delete(id, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const books = JSON.parse(data);
        // eslint-disable-next-line eqeqeq
        const index = books.findIndex((p) => p.id == id); // === does not work
        if (index !== -1) {
          books.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(books), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(index);
            }
          });
        }
      }
    });
  },
  insert(newData, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const books = JSON.parse(data);
        books.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(books), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  search: (searchObject, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let books = JSON.parse(data);
        // Perform search
        if (searchObject) {
          // Example search object
          // let searchObject = {
          //   "id": 1,
          //   "name": 'A'
          // };
          books = books.filter(
            // eslint-disable-next-line eqeqeq
            (b) => (searchObject.id ? b.id == searchObject.id : true) // === does not work
              && (searchObject.name
                ? b.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true)
          );
        }

        resolve(books);
      }
    });
  },
  update: (newData, id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const books = JSON.parse(data);
        // eslint-disable-next-line eqeqeq
        const book = books.find((p) => p.id == id); // === does not work
        if (book) {
          Object.assign(book, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(books), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      }
    });
  }
};

module.exports = bookRepo;
