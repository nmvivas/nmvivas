const { faker } = require("@faker-js/faker");
const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://localhost:60001";

const client = new MongoClient(url);

const dbName = "sharddemo";
const db = client.db(dbName);
const collection = db.collection("myusers");

let users = [];

console.log(faker.internet.userName());

const seedDatabase = async () => {
  for (let i = 1; i < 50; i++) {
    const cedula = faker.number.int({ min: 1700000000, max: 1800000000 });
    const nombre = faker.person.fullName();
    const email = faker.internet.email();
    const usuario = faker.internet.userName();
    const password = faker.internet.password();

    console.log(i, { cedula, nombre, email, usuario, password });

    users.push({ cedula, nombre, email, usuario, password });
  }

  const results = await collection.insertMany(users);
  client.close();
};

seedDatabase();
