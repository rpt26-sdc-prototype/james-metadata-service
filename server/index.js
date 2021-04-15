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

const server = require('./app');

server.app.listen(server.port, () => {
  console.log('Metadata Service started on port',server.port);
})
