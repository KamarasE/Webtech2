const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

const bookRoutes = require('./routes/books');

let db;

// MongoDB csatlakozás
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    db = client.db();
    console.log('✅ Kapcsolódva a MongoDB-hez');

    app.use('/api/books', bookRoutes(db));

    // Ide jöhetnek a route-ok  
    app.get('/', (req, res) => {
      res.send('📚 Könyvtár API működik');
    });

    app.get('/api/test', async (req, res) => {
      try {
        const result = await db.collection('test').find().toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: 'Hiba az adatlekérdezés során' });
      }
    });

    // Szerver indítása
    app.listen(port, () => {
      console.log(`🚀 Szerver fut a http://localhost:${port} címen`);
    });
  })
  .catch(error => {
    console.error('❌ Hiba a MongoDB-hez kapcsolódás során:', error);
  });
