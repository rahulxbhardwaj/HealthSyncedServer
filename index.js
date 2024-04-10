const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const DB_URL = 'mongodb+srv://rahulxbhardwaj:Rahul98112%40@cluster0.lnoim7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});


mongoose.connect(DB_URL,).then(() => {
  console.log('Connected to MongoDB ! ');
})

const User = mongoose.model('User', userSchema);


server.use(cors());
server.use(bodyParser.json());


server.post('/newUser' ,async(req,res)=> {

  let user = new User();
  user.name = req.body.name;
  user.age = req.body.age;
  const doc = await user.save();
  
  console.log(doc);
  res.json(doc);
})


server.listen(8080 , () => {
  console.log("Server Started !")
})
