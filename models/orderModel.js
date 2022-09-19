const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema({
    title:String,
    description:String,
    price:String,
    image:String
},{_id:false})


const orderSchema = mongoose.Schema({

    restaurantName:String,
    cartItems : [cartItemSchema],
    cartValue:Number,

}, {timestamps:{createdAt:'created_at', updatedAt:'updated_at'}})

module.exports = mongoose.model('Order', orderSchema);