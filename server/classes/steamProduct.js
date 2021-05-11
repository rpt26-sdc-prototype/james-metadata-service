const axios = require('axios');
const monthMS = 30 * 24 * 60 * 60 * 1000; //30 days, 24 hours, 60 minutes, 60 seconds, 1000 ms

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
  developer: [
    'Valve', 'Digital Extremes', 'Blizzard', 'Sierra', 'Game Making Company 001', 'RandoMakers', 'Develoboys', 'Pathfinder', 'RPT26', 'Hack Reactor',
    'Nintendo', 'Rareware', 'DICE'
  ],
  publisher: [
    'EA', 'Valve', 'Nintendo', 'Microsoft', 'Sony', 'Ubisoft', 'Publishing Company', 'OtherPublishing Company', 'Epic', 'Shady Publisher'
  ]
}

class SteamProduct {
  constructor(options = {}) {
    this.generated = []; //contains promises, when all are resolved, the generation of this object is complete

    options.name !== undefined ? this.name = options.name : this.setRandName();
    options.price !== undefined ? this.price = options.price : this.setRandPrice();
    options.description !== undefined ? this.description = options.description : this.setRandDescription();
    options.shortDescription !== undefined ? this.shortDescription = options.shortDescription : this.setRandShortDescription();
    options.genre !== undefined ? this.genre = options.genre : this.setRandGenre();
    options.developer !== undefined ? this.developer = options.developer : this.setRandDeveloper();
    options.publisher !== undefined ? this.publisher = options.publisher : this.setRandPublisher();
    options.releaseDate !== undefined ? this.releaseDate = options.releaseDate : this.setRandReleaseDate();
  }

  setRandName() {
    var lengths = {
      prefixes: randTables.name.prefixes.length,
      infixes: randTables.name.infixes.length,
      suffixes: randTables.name.suffixes.length,
    };
    var str = randTables.name.prefixes[Math.floor(Math.random() * lengths.prefixes)] + ' ';
    str += randTables.name.infixes[Math.floor(Math.random() * lengths.infixes)];
    Math.random() < .60 ? str += randTables.name.suffixes[Math.floor(Math.random() * lengths.suffixes)] : null;
    this.name = str;
  }

  setRandPrice() {
    this.price = (Math.floor(Math.random() * 12) * 500);
    Math.random() < .05 ? this.price *= Math.floor(Math.random() * 5) : null;
    Math.random() < .5 ? this.price += 99 : null;
    this.price /= 100;
  }

  setRandDescription() {
    var paragraphs = Math.floor(Math.random * 6) + 3;
    this.description = axios.get(`https://www.loripsum.net/api/${paragraphs}/long/headers`).then((results)=> {
      this.description = results.data;
    }).catch(() => {
      this.description = 'Description not Found...';
    })
    this.generated.push(this.description);
  }

  setRandShortDescription() {
    this.shortDescription = axios.get('https://www.loripsum.net/api/1/medium/plaintext').then((results) => {
      this.shortDescription = results.data;
    }).catch(() => {
      this.shortDescription = 'Description not found...';
    })
    this.generated.push(this.shortDescription);
  }

  setRandGenre() {
    this.genre = randTables.genres[Math.floor(Math.random() * randTables.genres.length)];
  }

  setRandDeveloper() {
    this.developer = randTables.developer[Math.floor(Math.random() * randTables.developer.length)];
  }

  setRandPublisher() {
    Math.random() < .4 ? this.publisher = this.developer
    : this.publisher = randTables.publisher[Math.floor(Math.random() * randTables.publisher.length)];
  }

  setRandReleaseDate() {
    this.releaseDate = Math.floor(Math.random() * new Date('December 31, 2019 11:59:59').getTime() );
  }
}

module.exports = SteamProduct;
