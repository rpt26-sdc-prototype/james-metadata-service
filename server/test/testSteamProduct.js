const Promise = require('bluebird');
const SteamProduct = require('../classes/steamProduct');


test('product has all required properties', () => {
  var product = new SteamProduct();

  Promise.all(product.generated).then(() => {
    expect(product.name).toBeDefined();
    expect(product.price).toBeDefined();
    expect(product.description).toBeDefined();
    expect(product.shortDescription).toBeDefined();
    expect(product.developer).toBeDefined();
    expect(product.publisher).toBeDefined();
    expect(product.genre).toBeDefined();
  })
});

test('product should be configurable', () => {
  var config = {
    name: 'Game',
    price: 6000,
    description: 'hey',
    shortDescription: 'ho',
    developer: 'dev',
    publisher: 'pub',
    genres: [{name: 'genre'}, {name: 'genre2'}]
  };
  var product = new SteamProduct(config);

  Promise.all(product.generated).then(() => {
    expect(product.name).toBe(config.name);
    expect(product.price).toBe(config.price);
    expect(product.description).toBe(config.description);
    expect(product.shortDescription).toBe(config.shortDescription);
    expect(product.developer).toBe(config.developer);
    expect(product.publisher).toBe(config.publisher);
    expect(product.genres[0].name).toBe(config.genres[0].name);
    expect(product.genres[1].name).toBe(config.genres[1].name);
  })
});
