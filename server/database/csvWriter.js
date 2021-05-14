const fs = require('fs');
const { generateGame } = require('./gameGenerator');

const writer = fs.createWriteStream('./server/database/games.csv');

const writeCSV = (writer, encoding, callback) => {
  let i = 1e7;
  let id = 0;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = JSON.stringify(generateGame(id));
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
writeCSV(writer, 'utf-8', () => {
  writer.end();
  const end = new Date().getTime();
  const mins = (end - start) / 1000 / 60;
  console.log(`csv written in ${mins} mins`);
});
