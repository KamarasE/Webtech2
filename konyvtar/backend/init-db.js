const { MongoClient } = require('mongodb');
const fs = require('fs');

// MongoDB kapcsolat beállításai
const uri = 'mongodb://localhost:27017';
const dbName = 'konyvtar';
const collectionName = 'books';

// JSON adat beolvasása fájlból
const data = JSON.parse(fs.readFileSync('./books.json', 'utf8'));

MongoClient.connect(uri)
  .then(async client => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Előző adatok törlése
    await collection.deleteMany({});

    // Új adatok beszúrása
    const result = await collection.insertMany(data);
    console.log(`✅ könyvek hozzáadva az adatbázishoz`);

    await client.close();
  })
  .catch(err => {
    console.error('❌ Hiba a MongoDB kapcsolat során:', err);
  });
