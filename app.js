const { MongoClient } = require("mongodb");

const url = "";
const client = new MongoClient(url);

const dbName = "Interests";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("Birds");

  //// Create
  const insertResult = await collection.insertMany([
    { name: "Chickadee", active: true },
    { name: "Cardinal", active: true },
    { name: "Bluejay", active: true },
    { name: "Sparrow", active: true },
  ]);
  console.log("Insert documents:", insertResult);

  //// Read
  const findResult = await collection.find({}).toArray();
  console.log("Found documents:", findResult);

  let filteredDocs = await collection.find({ name: "Chickadee" }).toArray();
  console.log("Found documents filtered by Chickadee", filteredDocs);

  //// Update
  const updateResult = await collection.updateOne(
    { name: "Sparrow" },
    { $set: { name: "Harris Sparrow" } }
  );
  console.log("Updated document", updateResult);

  filteredDocs = await collection.find({ name: "Harris Sparrow" }).toArray();
  console.log("Found documents filtered by Harris Sparrow", filteredDocs);

  //// Delete
  const deleteResult = await collection.deleteMany({});
  console.log("Deleted documents", deleteResult);

  return "Done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
