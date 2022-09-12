require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {ConnectDB} = require('./db/config');

const app = express();
ConnectDB();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());




app.listen(PORT,()=>{
console.log(`Listening on port ${PORT}`)
})