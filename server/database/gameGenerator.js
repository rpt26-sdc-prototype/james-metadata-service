const fs = require('fs');
const faker = require('faker');

const randTables = {
  names: {
    prefixes: [
      'War', 'Fight', 'Dating', 'Puzzle', 'Age', 'Wonders', 'Death', 'Magic', 'Dungeons', 'Dragon', 'Kill', 'Mailman', 'Surgeon', 'Job', 'Farming',
      'Mine', 'Comedy', 'Questing', 'Half', 'Watch', 'Game', 'Building', 'Football', 'Soccer', 'Tennis', 'Mario', 'Sonic', 'Rayman', 'The Matrix',
      'Candy', 'Lollypop', 'Path', 'Gun', 'Little', 'Call', 'Team', 'Dwarf', 'Ancient', 'Maximum', 'Serious', 'Scum', 'Warhammer', 'Pocket',
      'Portal', 'Duke', 'Adventure', 'Diablo', 'Dead', 'Hot', 'Hunt Down the', 'Final', 'Banjo'
    ],
    infixes: [
      'Frame', '-Life', 'Simulator', 'of Exiles', 'of Empires', 'Fortress', 'Craft', 'Monsters', 'Masters', 'Champion', 'of Doom', 'Lovers',
      'Vampires', 'Sam', 'Freeman', 'Nukem', 'Dogs', 'Sense', 'Nonsense', 'Halo', 'Fire', 'Fall', 'Burns', 'Time', 'Show', 'Index', 'Party', 'Golf',
      'Tennis', 'Sports', 'Hotshots', 'Head', 'Bikers', 'of Zelda', 'Rising', 'At the Olympic Games', 'Wheels', 'Ripper', 'Fantasy', 'Sunshine',
      'Odyssey', 'Galaxy', 'Kazooie', '64'
    ],
    suffixes: [
      ' II', ' 2', ' 2: Electric Boogaloo', ' III', ' 3', ' 3: Nuclear Powered Beegalee', ' IV', ' 4', ': 40,000', ': Revengenance', ' 2016', ' 2017',
      ' 2018', ' 2019', ' 2020', ': Pandemic Edition', ': Unnecessarily Subtitled', ': Maximum Overtime', ': Unrated and Uncut', ': Family Friendly!',
      ': Deluxe', ': The Third', ': The Second', ': Classic', ': Source', ': VR Edition', ' 237', '™',
      ': Not Enough Dakka', ' Unleashed', ': Complete', ': Game of the Year Edition', ' XIII-2', ' 538-D'
    ]
  },
  genres: [
    'Strategy', 'Real Time Strategy', 'Turn Based Strategy', 'First Person Shooter', 'Third Person Shooter', '4X', 'Puzzle', 'Action', 'Adventure', 'Open-world', 'Linear', 'Platformer', 'Cooperative', 'Battle-Royale', 'Competititve', 'Team Based', 'Visual Novel', '2D', 'Massively Multiplayer', 'Card Games on Motorcycles', 'Racing', 'Party'
  ],
  developers: [
    'Valve', 'Digital Extremes', 'Blizzard', 'Sierra', 'Game Making Company 001', 'RandoMakers', 'Develoboys', 'Pathfinder', 'RPT26', 'Hack Reactor',
    'Nintendo', 'Rareware', 'DICE'
  ],
  publishers: [
    'EA', 'Valve', 'Nintendo', 'Microsoft', 'Sony', 'Ubisoft', 'Publishing Company', 'OtherPublishing Company', 'Epic', 'Shady Publisher'
  ]
}

const setRandName = (num) => {
  const lengths = {
    prefixes: randTables.names.prefixes.length,
    infixes: randTables.names.infixes.length,
    suffixes: randTables.names.suffixes.length,
  };
  let name = randTables.names.prefixes[Math.floor(Math.random() * lengths.prefixes)] + ' ';
  name += randTables.names.infixes[Math.floor(Math.random() * lengths.infixes)];
  Math.random() < .60 ? name += randTables.names.suffixes[Math.floor(Math.random() * lengths.suffixes)] : null;
  return name;
}

const setRandPrice = () => {
  let price = (Math.floor(Math.random() * 12) * 500);
  Math.random() < .05 ? price *= Math.floor(Math.random() * 5) : null;
  Math.random() < .5 ? price += 99 : null;
  price /= 100;
  return price;
}

const setRandDesc = () => {
  let desc = descriptions[Math.floor(Math.random() * descriptions.length)];
  return desc;
};

const setRandShortDesc = () => {
  let shortDesc = shortDescriptions[Math.floor(Math.random() * shortDescriptions.length)];
  return shortDesc;
};

const setRandGenre = () => {
  let genre = randTables.genres[Math.floor(Math.random() * randTables.genres.length)];
  return genre;
}

const setRandDeveloper = () => {
  let developer = randTables.developers[Math.floor(Math.random() * randTables.developers.length)];
  return developer;
}

const setRandPublisher = () => {
  let publisher = randTables.publishers[Math.floor(Math.random() * randTables.publishers.length)];
  return publisher;
}

const setRandReleaseDate = () => {
  let releaseDate = Math.floor(Math.random() * new Date('December 31, 2019 11:59:59').getTime() );
  return releaseDate;
}

const generateGame = (id) => {
  const game = {
    id,
    name: setRandName(),
    price: setRandPrice(),
    description: faker.lorem.paragraphs(3),
    shortDescription: faker.lorem.paragraph(),
    genre: setRandGenre(),
    developer: setRandDeveloper(),
    publisher: setRandPublisher(),
    releaseDate: setRandReleaseDate(),
  }
  return game;
};

module.exports = { generateGame };
