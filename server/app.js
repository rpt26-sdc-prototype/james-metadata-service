//library
const express = require('express');
const path = require('path');
const Promise = require('bluebird');
require('core-js/stable');
require('regenerator-runtime/runtime');

//Server Init
const app = express();
const port = 4032;
const dbManager = require('./database/dbManager.js');

app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//Custom Classes
const SteamProduct = require('./classes/steamProduct.js');

//middleware import and activation
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//api endpoints

//create
app.post('/api/product/', (req, res, next) => {
  product = req.body;

  dbManager.insertGame(product).then((product) => {
    res.status(201).send('game created');
  }).catch((error) => {
    res.status(400).send(error);
  })
});

//read
app.get('/api/product/*', (req, res, next) => {
  productID = req.originalUrl.slice('/api/product/'.length);
  dbManager.getGame(productID).then((product) => {
    res.status(200).send(product);
  }).catch((error) => {
    res.status(404).send(error);
  })
});

//update
app.put('/api/product/*', (req, res, next) => {
  productID = req.originalUrl.slice('/api/product/'.length);
  key = Object.keys(req.body)[0];
  value = req.body[key];

  dbManager.updateGame(productID, key, value).then((product) => {
    res.status(200).send(product);
  }).catch((error) => {
    res.status(404).send(error);
  })
});

//delete
app.delete('/api/product/*', (req, res, next) => {
  productID = req.originalUrl.slice('/api/product/'.length);

  dbManager.deleteGame(productID).then((product) => {
    res.status(200).json({
      sucess: true,
      data: {}
    });
  }).catch((error) => {
    res.status(404).send(error);
  })
});

//serve static files
app.get('*/index.js', (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','index.js'));
})

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','index.html'));
})

module.exports = {app, port};
