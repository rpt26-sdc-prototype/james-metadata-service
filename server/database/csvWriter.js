const fs = require('fs');
const { generateGame } = require('./gameGenerator');

const stream = fs.createWriteStream('./server/database/games.csv');
stream.write('id,name,price,description,shortDescription,genre,developer,publisher,releaseDate\n', 'utf8');

const writeCSV = (writer, encoding, callback) => {
  let i = 1e7;
  let id = 0;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const { name, price, description, shortDescription, genre, developer, publisher, releaseDate } = generateGame();
      const data = `${id},${name},${price},${JSON.stringify(description)},${JSON.stringify(shortDescription)},${genre},${developer},${publisher},${releaseDate}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

const start = new Date().getTime();
writeCSV(stream, 'utf-8', () => {
  stream.end();
  const end = new Date().getTime();
  const mins = (end - start) / 1000 / 60;
  console.log(`csv written in ${mins} mins`);
});
