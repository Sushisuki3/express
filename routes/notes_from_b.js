var express = require('express');
var router = express.Router();
const cors = require('cors');
require('dotenv').config();

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

router.use(cors());

router.get('/', async function (req, res, next) {
  try {
    await client.connect();

    const database = client.db('notes');
    const notes = database.collection('notes');

    const note = await notes.find({}).toArray();

    res.json(note);
  } catch (error) {
    console.error('MongoDBエラー:', error);
    next(error);
  }
});

module.exports = router;