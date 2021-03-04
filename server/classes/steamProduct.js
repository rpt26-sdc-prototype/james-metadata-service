const axios = require('axios');
const monthMS = 30 * 24 * 60 * 60 * 1000; //30 days, 24 hours, 60 minutes, 60 seconds, 1000 ms


class SteamProduct {
  constructor(options = {}) {
    this.randTables = {
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
          ': Not Enough Dakka', ' Unleashed', ': Complete', ': Game of the Year Edition', 'XIII-2', '538-D'
        ]
      },
      developer: [
        'Valve', 'Digital Extremes', 'Blizzard', 'Sierra', 'Game Making Company 001', 'RandoMakers', 'Develoboys', 'Pathfinder', 'RPT26', 'Hack Reactor',
        'Nintendo', 'Rareware', 'DICE'
      ],
      publisher: [
        'EA', 'Valve', 'Nintendo', 'Microsoft', 'Sony', 'Ubisoft', 'Publishing Company', 'OtherPublishing Company', 'Epic', 'Shady Publisher'
      ]
    }

    options.name !== undefined ? this.name = options.name : this.setRandName();
    options.price !== undefined ? this.price = options.price : this.setRandPrice();
    options.description !== undefined ? this.description = options.description : this.setRandDescription();
    options.shortDescription !== undefined ? this.shortDescription = options.shortDescription : this.setRandShortDescription();
    options.developer !== undefined ? this.developer = options.developer : this.setRandDeveloper();
    options.publisher !== undefined ? this.publisher = options.publisher : this.setRandPublisher();
    options.releaseDate !== undefined ? this.releaseDate = options.releaseDate : this.setRandReleaseDate();
  }

  setRandName() {
    var lengths = {
      prefixes: this.randTables.name.prefixes.length,
      infixes: this.randTables.name.infixes.length,
      suffixes: this.randTables.name.suffixes.length,
    };
    var str = this.randTables.name.prefixes[Math.floor(Math.random() * lengths.prefixes)] + ' ';
    str += this.randTables.name.infixes[Math.floor(Math.random() * lengths.infixes)];
    Math.random() < .60 ? str += this.randTables.name.suffixes : null;
    this.name = str;
    console.log(str);
  }

  setRandPrice() {
    this.price = (Math.floor(Math.random() * 12) * 500);
    Math.random() < .05 ? this.price *= Math.floor(Math.random() * 5) : null;
    Math.random() < .5 ? this.price += 99 : null;
  }

  setRandDescription() {
    var paragraphs = Math.floor(Math.random * 6) + 3;
    axios.get(`https://www.loripsum.net/api/${paragraphs}/long/headers`).then((data)=> {
      this.description = data;
    });
  }

  setRandShortDescription() {
    axios.get('https://www.loripsum.net/api/1/medium/plaintext').then((data) => {
      this.shortDescription = data;
    });
  }

  setRandDeveloper() {
    this.developer = this.randTables.developer[Math.floor(Math.random() * this.randTables.developer.length)];
  }

  setRandPublisher() {
    Math.random() < .4 ? this.publisher = this.developer
    : this.publisher = this.randTables.publisher[Math.floor(Math.random() * this.randTables.publisher.length)];
  }

  setRandReleaseDate() {
    if (Math.random < .85) { //release date in past
      this.releaseDate = Math.floor(Math.random() * new Date().getTime() );
    } else { //release date in future
      this.releaseDate = Math.floor(Math.random() * monthMS * 6) + new Date.getTime();
    }
  }
}

export default SteamProduct;