const express = require('express');
const router = express.Router();

module.exports = function (db) {
  const booksCollection = db.collection('books');

  // Könyvek listázása
  router.get('/', async (req, res) => {
    try {
      const books = await booksCollection.find().toArray();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: 'Nem sikerült lekérdezni a könyveket' });
    }
  });

  // Új könyv hozzáadása
  router.post('/', async (req, res) => {
    const { title, author, year } = req.body;

    // Egyszerű validáció
    if (!title || !author || typeof year !== 'number') {
      return res.status(400).json({ error: 'Hibás vagy hiányzó adatok' });
    }

    try {
      const existing = await booksCollection.findOne({ title, author });
      if (existing) {
        return res.status(400).json({ error: 'Ez a könyv már létezik' });
      }

      const result = await booksCollection.insertOne({ title, author, year });
      res.status(201).json({ message: 'Könyv hozzáadva', id: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: 'Nem sikerült hozzáadni a könyvet' });
    }
  });

 router.delete('/', async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Hiányzó adatok (title, author)' });
  }

  try {
    const result = await booksCollection.deleteOne({ title, author });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'A megadott könyv nem található' });
    }

    res.json({ message: 'Könyv törölve' });
  } catch (err) {
    res.status(500).json({ error: 'Hiba a könyv törlésekor' });
  }
});

  return router;
};
