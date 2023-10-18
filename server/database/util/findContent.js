// find chaos dungeon that's right for you
// testing
//const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const { MONGO_URI } = require("..");
//mongoose.connect(uri);

// getContentList with client and contentType
async function getContentList(client, contentType) {
  return client
    .db("dungeon_and_character_data")
    .collection(contentType)
    .find()
    .sort("ilvl")
    .toArray();
}

// selectedContent:
// {"akkan": "hard", "brelshaza" :  "ha"}
async function selectGoldContent(selectedContent) {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    // store gold earning content in array
    const contentList = await getContentList(client, "gold_earning_content");

    // console.log("content list: ", contentList);
    // select content that is in the object containing selected content and matches the level selected
    const selectedContentDetails = contentList.filter(
      (content) =>
        Object.hasOwn(selectedContent, content.name) &&
        content.level === selectedContent[content.name]
    );

    return selectedContentDetails;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
async function findBestContent(ilvl, contentType) {
  const client = new MongoClient(MONGO_URI);
  try {
    // connect to mongoDB

    await client.connect();

    // query data collection for content , sort by ilvl so it's easy to find the best one for the item level
    const contentList = await getContentList(client, contentType);

    if (
      contentType === "chaos_dungeons" ||
      contentType === "guardian_raids" ||
      contentType === "cubes"
    ) {
      return contentList.reduce((best, content) =>
        ilvl >= content.ilvl ? content : best
      );
    } else if (contentType === "gold_earning_content") {
      // gold earning content is diff because it should be an array of 3 items
      const bestContent = [];
      for (let i = contentList.length - 1; i >= 0; i--) {
        if (contentList[i].ilvl <= ilvl && bestContent.length < 3) {
          // no duplicate content
          let canBeAdded = bestContent.reduce(
            (isOK, c) => isOK && c.name !== contentList[i].name,
            true
          );
          if (canBeAdded) bestContent.push(contentList[i]);
        }
      }
      return bestContent;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// async function listDatabases(client) {
//   let databasesList = await client.db().admin().listDatabases();
//   console.log("Databases: ")

//   databasesList.databases.forEach(db => console.log(`- ${db.name}`));
// }
// const ilvl = 1560 ;
// findBestContent(ilvl, 'gold_earning_content').then(result => console.log(result));
module.exports = { findBestContent, selectGoldContent };
