const Genre = require('../classes/genre');

test('genre should hold a value', () => {
  var genre = new Genre('Strategy');

  expect(genre.name).toBe('Strategy');
});