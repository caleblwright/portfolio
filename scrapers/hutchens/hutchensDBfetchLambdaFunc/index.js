const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URI, {
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
});
let isConnected = false;

exports.handler = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  const rows = await client
    .db("foreclosures")
    .collection("HutchensForeclosureData")
    .find({})
    .sort({ scraped_at: -1 })
    .limit(100)
    .toArray();

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(rows),
  };
};
