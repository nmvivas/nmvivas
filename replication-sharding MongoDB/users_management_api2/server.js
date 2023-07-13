const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const url = "mongodb://localhost:60001";
// const client = new MongoClient(url);
const client = new MongoClient(
  "mongodb://localhost:50004," + "localhost:50005," + "localhost:50006"
);
const cors = require("cors");

const dbName = "sharddemo";

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/users/create", async (req, res) => {
  const { cedula, nombre, email, usuario, password } = req.body;

  const db = client.db(dbName);
  const collection = db.collection("myusers");
  try {
    const result = await collection.insertOne({
      cedula,
      nombre,
      email,
      usuario,
      password,
    });

    return res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/users/edit", async (req, res) => {
  const { cedula, nombre, email, usuario, password, _id } = req.body;

  try {
    const db = client.db(dbName);
    const collection = db.collection("myusers");
    const result = await collection.updateOne(
      { _id: new ObjectId(_id), usuario },
      { $set: { cedula, nombre, email, usuario, password } }
    );
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

app.get("/users", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("myusers");
    const result = await collection.find({}).toArray();
    return res.json(result).status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/users/delete", async (req, res) => {
  const { _id } = req.body;

  try {
    const db = client.db(dbName);
    const collection = db.collection("myusers");
    const result = await collection.deleteOne({ _id: new ObjectId(_id) });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

app.listen(3003, () => {
  console.log("app started on port 3001");
});
