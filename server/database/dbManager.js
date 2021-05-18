const Promise = require('bluebird');
const pool = Promise.promisifyAll(require('./connection.js'));
const SteamProduct = require('../classes/steamProduct.js');

class DataManager {
  constructor() { }

  initializeDatabase() {
    return pool.queryAsync("DROP TABLE IF EXISTS `games`;")
      .then(() => {
      return pool.queryAsync("CREATE TABLE `games` (`id` INTEGER NOT NULL AUTO_INCREMENT, `name` VARCHAR(100) NULL DEFAULT 'NULL', `price` INTEGER NULL DEFAULT NULL, `description` LONGBLOB NULL, `shortDescription` BLOB NULL, `genre` VARCHAR(100), `developer` VARCHAR(100) NULL DEFAULT 'NULL', `publisher` VARCHAR(100) NULL DEFAULT NULL, `releaseDate` BIGINT NULL DEFAULT NULL, PRIMARY KEY (`id`));");
    });
  }

  insertGame(product) {
    return pool.queryAsync(`INSERT INTO games (name, price, description, shortDescription, genre, developer, publisher, releaseDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,[product.name, product.price * 100, product.description, product.shortDescription, product.genre, product.developer, product.publisher, product.releaseDate]);
  }

  getGame(id) {
    return pool.queryAsync(`Select * from games where id = ${id}`)
    .then((data) => {
      // let dateObj = new Date(data.rows[0].releaseDate);
      // let numMon = dateObj.getMonth();
      // let dateStr = '';
      // numMon === 0 ? dateStr += 'Jan' :
      // numMon === 1 ? dateStr += 'Feb' :
      // numMon === 2 ? dateStr += 'Mar' :
      // numMon === 3 ? dateStr += 'Apr' :
      // numMon === 4 ? dateStr += 'May' :
      // numMon === 5 ? dateStr += 'Jun' :
      // numMon === 6 ? dateStr += 'Jul' :
      // numMon === 7 ? dateStr += 'Aug' :
      // numMon === 8 ? dateStr += 'Sep' :
      // numMon === 9 ? dateStr += 'Oct' :
      // numMon === 10 ? dateStr += 'Nov' :
      // numMon === 11 ? dateStr += 'Dec' : dateStr += 'Month';
      // dateStr += ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear();
      // data.rows[0].releaseDate = dateStr;

      // if (data.rows[0].price !== 0) {
      //   data.rows[0].price = data.rows[0].price + '';

      //   data.rows[0].price.length === 2 ? data.rows[0].price = '$0.' + data.rows[0].price : data.rows[0].price = '$' + data.rows[0].price.slice(0, -2) + '.' + data.rows[0].price.slice(-2);
      // } else {
      //   data.rows[0].price = 'Free to Play';
      // }

      // data.rows[0].description = data.rows[0].description.toString('utf-8');
      // data.rows[0].shortDescription = data.rows[0].shortDescription.toString('utf-8');

      return data.rows[0];
    });
  }

  updateGame(id, key, value) {
    return pool.queryAsync(`UPDATE games SET ${key} = ? WHERE id = ?`, [value, id]);
  }

  deleteGame(id) {
    return pool.queryAsync(`DELETE FROM games WHERE id = ${id}`);
  }

  closeConnection() {
    pool.closeConnection();
  }
}

module.exports = new DataManager();
