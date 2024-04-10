const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');

server.use(cors());
server.use(bodyParser.json());

server.post('/demo' ,(req,res)=> {
  console.log(req.body);
  res.json(req.body);
})


server.listen(8080 , () => {
  console.log("Server Started !")
})
