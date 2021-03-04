//library
const express = require('express');
const app = express();
const port = 4032;
const route = require('./routes.js');
const path = require('path');
const db = require('./database/index.js');

//middleware import and activation
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post('/api/seed', (req, res) => {
  if(req.body.areYouSure === true) {
    db.seed().then((results) => {
      req.status(201).send(results);
    }).catch(e => {
      req.status(500).send(e);
    })
  }
});