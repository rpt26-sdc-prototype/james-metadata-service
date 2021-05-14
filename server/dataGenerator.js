// const faker = require('faker');
// const fs = require('fs');

// const monthMS = 30 * 24 * 60 * 60 * 1000; //30 days, 24 hours, 60 minutes, 60 seconds, 1000 ms

// const generateSampleGames = (num) => {
//   const sampleGames = [];
//   const randTables = {
//     name: {
//       prefixes: [
//         'War', 'Fight', 'Dating', 'Puzzle', 'Age', 'Wonders', 'Death', 'Magic', 'Dungeons', 'Dragon', 'Kill', 'Mailman', 'Surgeon', 'Job', 'Farming',
//         'Mine', 'Comedy', 'Questing', 'Half', 'Watch', 'Game', 'Building', 'Football', 'Soccer', 'Tennis', 'Mario', 'Sonic', 'Rayman', 'The Matrix',
//         'Candy', 'Lollypop', 'Path', 'Gun', 'Little', 'Call', 'Team', 'Dwarf', 'Ancient', 'Maximum', 'Serious', 'Scum', 'Warhammer', 'Pocket',
//         'Portal', 'Duke', 'Adventure', 'Diablo', 'Dead', 'Hot', 'Hunt Down the', 'Final', 'Banjo'
//       ],
//       infixes: [
//         'Frame', '-Life', 'Simulator', 'of Exiles', 'of Empires', 'Fortress', 'Craft', 'Monsters', 'Masters', 'Champion', 'of Doom', 'Lovers',
//         'Vampires', 'Sam', 'Freeman', 'Nukem', 'Dogs', 'Sense', 'Nonsense', 'Halo', 'Fire', 'Fall', 'Burns', 'Time', 'Show', 'Index', 'Party', 'Golf',
//         'Tennis', 'Sports', 'Hotshots', 'Head', 'Bikers', 'of Zelda', 'Rising', 'At the Olympic Games', 'Wheels', 'Ripper', 'Fantasy', 'Sunshine',
//         'Odyssey', 'Galaxy', 'Kazooie', '64'
//       ],
//       suffixes: [
//         ' II', ' 2', ' 2: Electric Boogaloo', ' III', ' 3', ' 3: Nuclear Powered Beegalee', ' IV', ' 4', ': 40,000', ': Revengenance', ' 2016', ' 2017',
//         ' 2018', ' 2019', ' 2020', ': Pandemic Edition', ': Unnecessarily Subtitled', ': Maximum Overtime', ': Unrated and Uncut', ': Family Friendly!',
//         ': Deluxe', ': The Third', ': The Second', ': Classic', ': Source', ': VR Edition', ' 237 (change 237 to roman numerals?)', '™',
//         ': Not Enough Dakka', ' Unleashed', ': Complete', ': Game of the Year Edition', ' XIII-2', ' 538-D'
//       ]
//     },
//     genres: [
//       'Strategy', 'Real Time Strategy', 'Turn Based Strategy', 'First Person Shooter', 'Third Person Shooter', '4X', 'Puzzle', 'Action', 'Adventure', 'Open-world', 'Linear', 'Platformer', 'Cooperative', 'Battle-Royale', 'Competititve', 'Team Based', 'Visual Novel', '2D', 'Massively Multiplayer', 'Card Games on Motorcycles', 'Racing', 'Party'
//     ],
//     developers: [
//       'Valve', 'Digital Extremes', 'Blizzard', 'Sierra', 'Game Making Company 001', 'RandoMakers', 'Develoboys', 'Pathfinder', 'RPT26', 'Hack Reactor',
//       'Nintendo', 'Rareware', 'DICE'
//     ],
//     publishers: [
//       'EA', 'Valve', 'Nintendo', 'Microsoft', 'Sony', 'Ubisoft', 'Publishing Company', 'OtherPublishing Company', 'Epic', 'Shady Publisher'
//     ]
//   }

//   const setRandName = (num) => {
//     const lengths = {
//       prefixes: randTables.name.prefixes.length,
//       infixes: randTables.name.infixes.length,
//       suffixes: randTables.name.suffixes.length,
//     };
//     let str = randTables.name.prefixes[Math.floor(Math.random() * lengths.prefixes)] + ' ';
//     str += randTables.name.infixes[Math.floor(Math.random() * lengths.infixes)];
//     Math.random() < .60 ? str += randTables.name.suffixes[Math.floor(Math.random() * lengths.suffixes)] : null;
//     return str;
//   }

//   const setRandPrice = () => {
//     let price = (Math.floor(Math.random() * 12) * 500);
//     Math.random() < .05 ? price *= Math.floor(Math.random() * 5) : null;
//     Math.random() < .5 ? price += 99 : null;
//     price /= 100;
//     return price;
//   }

//   const setRandDesc = () => {
//     return descriptions[Math.floor(Math.random() * descriptions.length)];
//   };

//   const setRandShortDesc = () => {
//     return shortDescriptions[Math.floor(Math.random() * shortDescriptions.length)];
//   };

//   const setRandGenre = () => {
//     return randTables.genres[Math.floor(Math.random() * randTables.genres.length)];
//   }

//   const setRandDeveloper = () => {
//     return randTables.developers[Math.floor(Math.random() * randTables.developers.length)];
//   }

//   const setRandPublisher = () => {
//     return randTables.publishers[Math.floor(Math.random() * randTables.publishers.length)];
//   }

//   const setRandReleaseDate = () => {
//     return Math.floor(Math.random() * new Date('December 31, 2019 11:59:59').getTime() );
//   }

//   let count = 0;
//   const names = [];
//   const prices = [];
//   const descriptions = [];
//   const shortDescriptions = [];
//   const genres = [];
//   const developers = [];
//   const publishers = [];
//   const releaseDates = [];

//   while (count < num) {
//     const game = {
//       name: setRandName(),
//       price: setRandPrice(),
//       description: faker.lorem.paragraphs(3),
//       shortDescription: faker.lorem.paragraph(),
//       genre: setRandGenre(),
//       developer: setRandDeveloper(),
//       publisher: setRandPublisher(),
//       releaseDate: setRandReleaseDate(),
//     }
//     sampleGames.push(game);
//     count += 1;
//   };

//   return sampleGames;
// }
// sampleGames = generateSampleGames(100);
// let id = 1;

// const writeJSON = (batchSize) => {
//   const games = [];
//   for (let i = 0; i < batchSize; i++) {
//     const index = Math.floor(Math.random() * sampleGames.length);
//     const game = {
//       id: id++,
//       game: sampleGames[index]
//     };
//     games.push(game);
//   }
//   fs.writeFileSync('./server/database/games.json', JSON.stringify(games, null, '\t'));
// };

// const numOfRecords = 10;
// const start = new Date().getTime();
// writeJSON(numOfRecords);
// const end = new Date().getTime();
// const secs = (end - start) / 1000;
// console.log(`${numOfRecords / 1e6} million records generated in ${secs} seconds`);
