const faker = require('faker');
const fs = require('fs');

const monthMS = 30 * 24 * 60 * 60 * 1000; //30 days, 24 hours, 60 minutes, 60 seconds, 1000 ms

const generateGames = (num) => {
  const games = [];
  const randTables = {
    name: {
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
        ': Deluxe', ': The Third', ': The Second', ': Classic', ': Source', ': VR Edition', ' 237 (change 237 to roman numerals?)', '™',
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

  const setRandName = () => {
    const lengths = {
      prefixes: randTables.name.prefixes.length,
      infixes: randTables.name.infixes.length,
      suffixes: randTables.name.suffixes.length,
    };
    let str = randTables.name.prefixes[Math.floor(Math.random() * lengths.prefixes)] + ' ';
    str += randTables.name.infixes[Math.floor(Math.random() * lengths.infixes)];
    Math.random() < .60 ? str += randTables.name.suffixes[Math.floor(Math.random() * lengths.suffixes)] : null;
    return str;
  }

  const setRandPrice = () => {
    let price = (Math.floor(Math.random() * 12) * 500);
    Math.random() < .05 ? price *= Math.floor(Math.random() * 5) : null;
    Math.random() < .5 ? price += 99 : null;
    price /= 100;
    return price;
  }

  const setRandGenre = () => {
    return randTables.genres[Math.floor(Math.random() * randTables.genres.length)];
  }

  const setRandDeveloper = () => {
    return randTables.developers[Math.floor(Math.random() * randTables.developers.length)];
  }

  const setRandPublisher = () => {
    return randTables.publishers[Math.floor(Math.random() * randTables.publishers.length)];
  }

  const setRandReleaseDate = () => {
    return Math.floor(Math.random() * new Date('December 31, 2019 11:59:59').getTime() );
  }

  let name;
  for (let i = 0; i < num; i++) {
    name = setRandName();
    const game = {
      id: i + 1,
      name,
      price: setRandPrice(),
      description: faker.lorem.paragraphs(faker.random.number({min: 3, max: 8})),
      shortDescription: faker.lorem.paragraph(),
      genre: setRandGenre(),
      developer: setRandDeveloper(),
      publisher: setRandPublisher(),
      releaseDate: setRandReleaseDate()
    };
    games.push(game);
  }
  fs.writeFileSync('./server/database/games.json', JSON.stringify(games, null, '\t'));
};

const numOfRecords = 100;
const start = new Date().getTime();

generateGames(numOfRecords);

const end = new Date().getTime();
const secs = (end - start) / 1000;
console.log(`${numOfRecords} records generated in ${secs} seconds`);
