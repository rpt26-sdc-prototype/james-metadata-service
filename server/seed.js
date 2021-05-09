const Promise = require('bluebird');
const SteamProduct = require('./classes/steamProduct');
const dbManager = require('./database/dbManager');
const Path = require('path');
let args = process.argv.slice(2);

switch(args[0]) {
  case 'production':
    require('dotenv').config({path: Path.resolve(__dirname, '../.prod.env')});
    break;
  case 'development':
    require('dotenv').config({path: Path.resolve(__dirname, '../.dev.env')})
    break;
  case 'testing':
    require('dotenv').config({path: Path.resolve(__dirname, '../.test.env')})
    break;
}

const products = [];

console.log('preparing to seed database...');

dbManager.initializeDatabase().then(() => {
  let start = new Date().getTime();
  console.log('Generating Products...');
  const numberOfRecords = 1000;
  for (let i = 0; i < numberOfRecords; i++) {
    products.push(new SteamProduct());
  }
  const productsGenerated = [];
  products.forEach(product => {
    productsGenerated.push(Promise.all(product.generated));
  })
  Promise.all(productsGenerated).then(() => {
    console.log('Adding Products to database....');
    const productsInserted = []
    products.forEach(product => {
      productsInserted.push(dbManager.insertGame(product));
    });
    return Promise.all(productsInserted);
  }).then(() => {
    let end = new Date().getTime();
    const secs = (end - start) / 1000;
    console.log(`${numberOfRecords} records loaded in ${secs} seconds`);
    process.exit(0);
  })
});
