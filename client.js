const express = require('express');

const apiHelper = require('./src/helpers/apiHelper');

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  apiHelper.callAPI('http://localhost:4000/api')
    .then((response) => {
      console.log(response);
      res.render('index',
        { list: ['a', 'b'], title: 'Hello World', data: response.data });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(5000, () => {
  console.log('listening on port 5000');
});
