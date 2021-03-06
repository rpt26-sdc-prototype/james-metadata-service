const Promise = require('bluebird');
const db = Promise.promisifyAll(require('./connection.js'));
const SteamProduct = require('../classes/steamProduct.js');
const Genre = require('../classes/genre.js');

class DataManager {
  constructor() { }

  //Init Database
  initializeDatabase() {
    return db.queryAsync("DROP TABLE IF EXISTS `item_genre_joinTable`;")
      .then(()=>{
      return db.queryAsync("CREATE TABLE `item_genre_joinTable` (`id` INTEGER NOT NULL AUTO_INCREMENT, `id_games` INTEGER NULL DEFAULT NULL, `id_genres` INTEGER NULL DEFAULT NULL, PRIMARY KEY (`id`));");
    }).then(() => {
      return db.queryAsync("DROP TABLE IF EXISTS `games`;");
    }).then(() => {
      return db.queryAsync("CREATE TABLE `games` (`id` INTEGER NOT NULL AUTO_INCREMENT, `name` VARCHAR(100) NULL DEFAULT 'NULL', `price` INTEGER NULL DEFAULT NULL, `description` LONGBLOB NULL, `shortDescription` BLOB NULL, `developer` VARCHAR(100) NULL DEFAULT 'NULL', `publisher` VARCHAR(100) NULL DEFAULT NULL, `releaseDate` BIGINT NULL DEFAULT NULL, PRIMARY KEY (`id`));");
    }).then(() => {
      return db.queryAsync("DROP TABLE IF EXISTS `genres`;");
    }).then(() => {
      return db.queryAsync("CREATE TABLE `genres` (`id` INTEGER NOT NULL AUTO_INCREMENT, `name` VARCHAR(100) NULL DEFAULT NULL, PRIMARY KEY (`id`));");
    }).then(() => {
      return db.queryAsync("ALTER TABLE `item_genre_joinTable` ADD FOREIGN KEY (id_games) REFERENCES `games` (`id`);");
    }).then(() => {
      return db.queryAsync("ALTER TABLE `item_genre_joinTable` ADD FOREIGN KEY (id_genres) REFERENCES `genres` (`id`);");
    })
  }

  //CREATE
  insertGenre(genre) {
    return db.queryAsync(`INSERT INTO genres (name) VALUES ('${genre.name}')`);
  }

  insertGame(product) {
    var genrePromises = [];
    product.genres.forEach((genre) => {
      genrePromises.push(db.queryAsync(`SELECT id FROM genres WHERE name = '${genre.name}'`).then((data) => {
        return data[0].id;
      }));
    })

    return db.queryAsync(`INSERT INTO games (name, price, description, shortDescription, developer, publisher, releaseDate)
      VALUES ('${product.name}', ${product.price * 100}, '${product.description}', '${product.shortDescription}', '${product.developer}', '${product.publisher}', ${product.releaseDate})`)
      .then((returnData) => {

        Promise.all(genrePromises).then((genreIds) => {
          var genreIDPromises = [];
          genreIds.forEach((id) => {
            genreIDPromises.push(db.queryAsync(`INSERT INTO item_genre_joinTable (id_games, id_genres) VALUES (${returnData.insertId}, ${id})`));
          });
          return Promise.all(genreIDPromises);
        });

      })
  }
}

module.exports = new DataManager();