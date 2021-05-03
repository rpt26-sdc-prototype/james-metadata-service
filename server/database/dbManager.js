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
        // return data[0].id;
        return genrePromises[0].id;
      }));
    })

    return db.queryAsync(`INSERT INTO games (name, price, description, shortDescription, developer, publisher, releaseDate)
      VALUES ('${product.name}', ${product.price * 100}, '${product.description}', '${product.shortDescription}', '${product.developer}', '${product.publisher}', ${product.releaseDate})`)
      .then((returnData) => {

        return Promise.all(genrePromises).then((genreIds) => {
          var relationshipPromises = [];
          genreIds.forEach((id) => {
            relationshipPromises.push(db.queryAsync(`INSERT INTO item_genre_joinTable (id_games, id_genres) VALUES (${returnData.insertId}, ${id})`).catch((err)=> {
              console.error(err);
            }));
          });
          return Promise.all(relationshipPromises);
        });

      })
  }

  getGame(id) {
    return db.queryAsync(`Select * from games where id = ${id}`)
    .then((data) => {
      //Translate Date
      let dateObj = new Date(data[0].releaseDate);
      let numMon = dateObj.getMonth();
      let dateStr = '';

      numMon === 0 ? dateStr += 'Jan' :
      numMon === 1 ? dateStr += 'Feb' :
      numMon === 2 ? dateStr += 'Mar' :
      numMon === 3 ? dateStr += 'Apr' :
      numMon === 4 ? dateStr += 'May' :
      numMon === 5 ? dateStr += 'Jun' :
      numMon === 6 ? dateStr += 'Jul' :
      numMon === 7 ? dateStr += 'Aug' :
      numMon === 8 ? dateStr += 'Sep' :
      numMon === 9 ? dateStr += 'Oct' :
      numMon === 10 ? dateStr += 'Nov' :
      numMon === 11 ? dateStr += 'Dec' : dateStr += 'Month';

      dateStr += ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear();

      data[0].releaseDate = dateStr;

      //Translate Price
      if (data[0].price !== 0) {
        data[0].price = data[0].price + '';

        data[0].price.length === 2 ? data[0].price = '$0.' + data[0].price : data[0].price = '$' + data[0].price.slice(0, -2) + '.' + data[0].price.slice(-2);

      } else {
        data[0].price = 'Free to Play';
      }

      data[0].description = data[0].description.toString('utf-8');
      data[0].shortDescription = data[0].shortDescription.toString('utf-8');
      data[0].genres = [];


      return db.queryAsync(`SELECT genres.name FROM genres INNER JOIN item_genre_joinTable WHERE item_genre_joinTable.id_games = ${id} AND item_genre_joinTable.id_genres = genres.id`)
      .then((genres) => {
        genres.forEach((genre) => {
          data[0].genres.push(genre.name);
        })
        return data[0];
      })
    })
  }

  updateGame(id, key, value) {
    return db.queryAsync(`UPDATE games SET ${key} = ? WHERE id = ?`, [value, id]);
  }

  deleteGame(id) {
    return db.queryAsync(`DELETE FROM item_genre_joinTable WHERE id_games = ${id}`)
    .then(() => {
      return db.queryAsync(`DELETE FROM games WHERE id = ${id}`);
    });
  }

  closeConnection() {
    db.closeConnection();
  }
}

module.exports = new DataManager();