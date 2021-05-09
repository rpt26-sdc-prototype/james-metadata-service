const Promise = require('bluebird');
const db = Promise.promisifyAll(require('./connection.js'));
const SteamProduct = require('../classes/steamProduct.js');
const Genre = require('../classes/genre.js');

class DataManager {
  constructor() { }

  initializeDatabase() {
    return db.queryAsync("DROP TABLE IF EXISTS `games`;")
      .then(() => {
      return db.queryAsync("CREATE TABLE `games` (`id` INTEGER NOT NULL AUTO_INCREMENT, `name` VARCHAR(100) NULL DEFAULT 'NULL', `price` INTEGER NULL DEFAULT NULL, `description` LONGBLOB NULL, `shortDescription` BLOB NULL, `genre` VARCHAR(100), `developer` VARCHAR(100) NULL DEFAULT 'NULL', `publisher` VARCHAR(100) NULL DEFAULT NULL, `releaseDate` BIGINT NULL DEFAULT NULL, PRIMARY KEY (`id`));");
    });
  }

  insertGame(product) {
    return db.queryAsync(`INSERT INTO games (name, price, description, shortDescription, genre, developer, publisher, releaseDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,[product.name, product.price * 100, product.description, product.shortDescription, product.genre, product.developer, product.publisher, product.releaseDate]);
  }

  getGame(id) {
    return db.queryAsync(`Select * from games where id = ${id}`)
    .then((data) => {
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

      if (data[0].price !== 0) {
        data[0].price = data[0].price + '';

        data[0].price.length === 2 ? data[0].price = '$0.' + data[0].price : data[0].price = '$' + data[0].price.slice(0, -2) + '.' + data[0].price.slice(-2);
      } else {
        data[0].price = 'Free to Play';
      }

      data[0].description = data[0].description.toString('utf-8');
      data[0].shortDescription = data[0].shortDescription.toString('utf-8');

      return data[0];
    })
  }

  updateGame(id, key, value) {
    return db.queryAsync(`UPDATE games SET ${key} = ? WHERE id = ?`, [value, id]);
  }

  deleteGame(id) {
    return db.queryAsync(`DELETE FROM games WHERE id = ${id}`);
  }

  closeConnection() {
    db.closeConnection();
  }
}

module.exports = new DataManager();
