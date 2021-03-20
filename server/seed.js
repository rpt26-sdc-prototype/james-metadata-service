const Promise = require('bluebird');

//Classes
var SteamProduct = require('./classes/steamProduct');
var Genre = require('./classes/genre');
var dbManager = require('./database/dbManager');

var products = [];
var genres = [];

console.log('preparing to seed database...');

dbManager.initializeDatabase().then(() => {
  //Generate Genres
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

  //Generate guaranteed product
  console.log('Generating Products...');

  products.push(new SteamProduct({
    name: "Age of Empires II: Definitive Edition",
    price: 19.99,
    description: `<p>Age of Empires II: Definitive Edition celebrates the 20th anniversary of one of the most popular strategy games ever with stunning 4K Ultra HD graphics, a new and fully remastered soundtrack, and brand-new content, “The Last Khans” with 3 new campaigns and 4 new civilizations.</p>

    <p>Explore all the original campaigns like never before as well as the best-selling expansions, spanning over 200 hours of gameplay and 1,000 years of human history. Head online to challenge other players with 35 different civilizations in your quest for world domination throughout the ages.</p>

    <p>Choose your path to greatness with this definitive remaster to one of the most beloved strategy games of all time.</p>

    <a href="https://privacy.microsoft.com/privacystatement">https://privacy.microsoft.com/privacystatement</a>`,
    shortDescription: `Age of Empires II: Definitive Edition celebrates the 20th anniversary of one of the most popular strategy games ever with stunning 4K Ultra HD graphics, a new and fully remastered soundtrack, and brand-new content, “The Last Khans” with 3 new campaigns and 4 new civilizations.`,
    developer: 'Forgotton Empires',
    publisher: 'Xbox Game Studios',
    releaseDate: new Date('14 Nov 2019').getTime(),
    genres: [genres[0]]
  }));
  //generate 99 fake games
  for (var i = 0; i < 99; i++) {
    var options = {genres: []};
    //Generate random genres
    for (var j = 0; j < Math.floor(Math.random() * 4) + 1; j++) {
      options.genres.push(genres[Math.floor(Math.random() * genres.length)]);
    }
    products.push(new SteamProduct(options));
  }

  var productsGenerated = [];
  products.forEach(product => {
    productsGenerated.push(product.description);
    productsGenerated.push(product.shortDescription);
  })

  Promise.all(productsGenerated).then(() => {
    console.log('Adding Genres to database...');
    var genresInserted = [];
    genres.forEach(genre => {
      genresInserted.push(dbManager.insertGenre(genre));
    })

    return Promise.all(genresInserted);

  }).then(() => {
    console.log('Adding Products to database....')
    var productsInserted = []
    products.forEach(product => {
      productsInserted.push(dbManager.insertGame(product));
    });

    return Promise.all(productsInserted);

  }).then(() => {
    console.log('Database Seeded!');
    process.exit(0);
  })
});
