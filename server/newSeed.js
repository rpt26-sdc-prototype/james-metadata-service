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

const Promise = require('bluebird');

const SteamProduct = require('./classes/steamProduct');
const Genre = require('./classes/genre');
const dbManager = require('./database/dbManager');

const products = [];
const genres = [];

console.log('preparing to seed database...');

dbManager.initializeDatabase().then(() => {
  console.log('Generating Genres...');
  genres.push(new Genre('Strategy'));
  genres.push(new Genre('Real Time Strategy'));
  genres.push(new Genre('Turn Based Strategy'));
  genres.push(new Genre('First Person Shooter'));
  genres.push(new Genre('Third Person Shooter'));
  genres.push(new Genre('4X'));
  genres.push(new Genre('Puzzle'));
  genres.push(new Genre('Action'));
  genres.push(new Genre('Adventure'));
  genres.push(new Genre('Open-world'));
  genres.push(new Genre('Linear'));
  genres.push(new Genre('Platformer'));
  genres.push(new Genre('Cooperative'));
  genres.push(new Genre('Battle-Royale'));
  genres.push(new Genre('Competititve'));
  genres.push(new Genre('Team Based'));
  genres.push(new Genre('Visual Novel'));
  genres.push(new Genre('2D'));
  genres.push(new Genre('Massively Multiplayer'));
  genres.push(new Genre('Card Games on Motorcycles'));
  genres.push(new Genre('Racing'));
  genres.push(new Genre('Party'));

  console.log('Generating Products...');
  const numberOfRecords = 100;
  for (let i = 0; i < numberOfRecords; i++) {
    const options = {genres: []};
    for (let j = 0; j < Math.floor(Math.random() * 4) + 1; j++) {
      options.genres.push(genres[Math.floor(Math.random() * genres.length)]);
    }
    products.push(new SteamProduct(options));
  }

  const productsGenerated = [];

  products.forEach(product => {
    productsGenerated.push(Promise.all(product.generated));
  })

  Promise.all(productsGenerated).then(() => {
    console.log('Adding Genres to database...');
    const genresInserted = [];
    genres.forEach(genre => {
      genresInserted.push(dbManager.insertGenre(genre));
    })

    return Promise.all(genresInserted);

  }).then(() => {
    console.log('Adding Products to database....');
    const productsInserted = []
    products.forEach(product => {
      productsInserted.push(dbManager.insertGame(product));
    });

    return Promise.all(productsInserted);

  }).then(() => {
    console.log('Database Seeded!');
    process.exit(0);
  })
});
