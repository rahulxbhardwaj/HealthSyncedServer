const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Environment Variables
const DB_URL = process.env.DB_URL;

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bmi: Number,
  mobile: Number,
  history: String,
});

mongoose.connect(DB_URL).then(() => {
  console.log('Connected to MongoDB!');
});

const User = mongoose.model('User', userSchema);

server.use(cors());
server.use(bodyParser.json());

server.post('/newUser', async (req, res) => {
  let user = new User({
    name: req.body.name,
    age: req.body.age,
    bmi: req.body.bmi,
    mobile: req.body.number,
    history: req.body.history,
  });

  try {
    const doc = await user.save();
    console.log(doc);
    res.json(doc);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


server.get('/alluser', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.listen(8080, () => {
  console.log('Server Started!');
});
