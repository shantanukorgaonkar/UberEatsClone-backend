const express = require('express');
const router = express.Router();
const { sendSuccess, sendError } = require('../Utils/Utils')
const fetch = require('node-fetch');


const getYelpRestaurants = async (req, res) => {
    const city = req.body.city
    const url = `https://api.yelp.com/v3/businesses/search?term="restaurants"&location=${city}`;
    const YELP_API_KEY = process.env.YELP_API_KEY;

    const apiOptions = {
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`
        }
    }

    try {
        const result = await fetch(url, apiOptions);
        const data =await result.json();
        const restaurants = data.businesses;
        if(restaurants.length ===0){
            return sendError(res,404,'No Restaurants Found');
        }
            return sendSuccess(res,200,'Restaurants Found',restaurants);

    } catch (error) {
        sendError(res,404,error.message);
    }
}

router.get('/', getYelpRestaurants);

module.exports = router