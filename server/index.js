const server = require('./app');

server.app.listen(server.port, () => {
  console.log('Metadata Service started on port',server.port);
})