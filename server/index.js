const Path = require('path');
require('dotenv').config({path: Path.resolve(__dirname, '../.env')});
const server = require('./app');

server.app.listen(server.port, () => {
  console.log('Metadata Service started on port',server.port);
})
