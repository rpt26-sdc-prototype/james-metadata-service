//library
const express = require('express');
const path = require('path');
const Promise = require('bluebird');

//Server Init
const app = express();
const port = 4032;
const route = require('./routes.js');
const dbManager = require('./database/dbManager.js');

//Custom Classes
const SteamProduct = require('./classes/steamProduct.js');
const Genre = require('./classes/genre.js');

//middleware import and activation
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/product/*', (req, res, next) => {
  productID = req.originalUrl.slice('/api/product/'.length);

  dbManager.getGame(productID).then((product) => {
    res.status(200).send(product);
  }).catch((error) => {
    res.status(500).send(error);
  })

});

app.listen(port, ()=> {
  console.log(`Server started on Port ${port}`);
});