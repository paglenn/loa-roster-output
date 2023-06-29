/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('dungeon_and_character_data');

// Insert a few documents into the sales collection.
db.getCollection('gold_earning_content').insertMany([
  {'name': 'argos', 'ilvl': 1370, 'gold': 1000 },
  {'name': 'oreha', 'ilvl': 1370, 'gold': 700 },
  {'name': 'valtan', 'level':'normal', 'ilvl': 1415, 'gold': 1200 },
  {'name': 'valtan', 'level': 'hard', 'ilvl': 1445, 'gold': 3000 },
  {'name': 'vykas', 'level':'normal', 'ilvl': 1430, 'gold': 1900 },
  {'name': 'vykas', 'level':'hard', 'ilvl': 1460, 'gold': 4500 },
  {'name': 'kakul-saydon', 'level':'normal', 'ilvl': 1475, 'gold': 4500 },
  {'name': 'brelshaza', 'level':'normal_1_2', 'ilvl': 1490, 'gold': 4500 },
  {'name': 'brelshaza', 'level':'normal_1_4', 'ilvl': 1500, 'gold': 6000 },
  {'name': 'brelshaza', 'level':'normal_1_6', 'ilvl': 1520, 'gold': 8500 },
  {'name': 'brelshaza', 'level':'hard_1_2', 'ilvl': 1540, 'gold': 9500 },
  {'name': 'brelshaza', 'level':'hard_1_4', 'ilvl': 1550, 'gold': 10000 },
  {'name': 'brelshaza', 'level':'hard_1_6', 'ilvl': 1550, 'gold': 10500 },
  {'name': 'kayangel', 'level':'normal', 'ilvl': 1540, 'gold': 4500 },
  {'name': 'kayangel', 'level':'hard', 'ilvl': 1580, 'gold': 5500 }

]);

// // Run a find command to view items sold on April 4th, 2014.
// const salesOnApril4th = db.getCollection('sales').find({
//   date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
// }).count();

// // Print a message to the output window.
// console.log(`${salesOnApril4th} sales occurred in 2014.`);

// // Here we run an aggregation and open a cursor to the results.
// // Use '.toArray()' to exhaust the cursor to return the whole result set.
// // You can use '.hasNext()/.next()' to iterate through the cursor page by page.
// db.getCollection('sales').aggregate([
//   // Find all of the sales that occurred in 2014.
//   { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
//   // Group the total sales for each product.
//   { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
// ]);
