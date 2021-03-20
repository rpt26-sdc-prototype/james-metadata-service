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


//api endpoints
app.get('/api/product/*', (req, res, next) => {
  productID = req.originalUrl.slice('/api/product/'.length);

  dbManager.getGame(productID).then((product) => {
    res.status(200).send(product);
  }).catch((error) => {
    res.status(500).send(error);
  })
});



//serve static files
app.get('*/index.js', (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','index.js'));
})

app.get('*/images/maincol_gradient_rule.png', (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','images','maincol_gradient_rule.png'));
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','index.html'));
})


module.exports = {app, port};
