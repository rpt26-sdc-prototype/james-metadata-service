//library
const express = require('express');
const path = require('path');
const Promise = require('bluebird');
const redis = require('redis')
require('core-js/stable');
require('regenerator-runtime/runtime');

//Server Init
const app = express();
const port = 3000;
const dbManager = require('./database/dbManager.js');

app.use(express.static(path.join(__dirname, '../public')));

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

const client = redis.createClient(6379);

client.on('ready', () => {
  console.log('client connected to Redis server');
});

client.on('error', (error) => {
  console.error(error);
});

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

var fakeRedis = {};

//read
// app.get('/api/product/*', (req, res, next) => {
//   productID = req.originalUrl.slice('/api/product/'.length);
//   if (fakeRedis[productID]) {
//     res.status(200).send(fakeRedis[productID]);
//     return;
//   }
//   dbManager.getGame(productID).then((product) => {
//     fakeRedis[productID] = product;
//     res.status(200).send(product);
//   }).catch((error) => {
//     res.status(404).send(error);
//   })
// });
app.get('/api/product/*', (req, res) => {
  productID = req.originalUrl.slice('/api/product/'.length);
  try {
    client.get(productID, async (err, product) => {
      if (product) {
        return res.status(200).send(product);
      } else {
        await dbManager.getGame(productID)
        .then((product) => {
          redis.set(productID, product);
          res.status(200).send(product);
        }).catch((error) => {
          res.status(404).send(error);
        })
      }
    })
  }
  catch (error) {
    console.error(error);
  }
});

// app.get('/api/clearfakeredis', (req, res) => {
//   fakeRedis = {};
//   res.status(200).send('fake redis is now clean');
// });

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
