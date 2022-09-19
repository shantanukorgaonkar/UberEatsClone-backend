require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {ConnectDB} = require('./db/config');
const orderRoutes = require('./routes/OrderRoutes')
const getYelpRestaurants = require('./Utils/GetYelpRestaurantsAPI')

const app = express();

ConnectDB();
  
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api/v1/orders',orderRoutes);
app.use('/api/v1/restaurants',getYelpRestaurants);

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this API.',
  }));

app.listen(PORT,()=>{
console.log(`Listening on port ${PORT}`)
})