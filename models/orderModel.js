const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema({
    title:String,
    description:String,
    price:String,
    image:String
},{_id:false})


const orderSchema = mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    restaurantName:String,
    cartItems : [cartItemSchema],
    cartValue:Number,

}, {timestamps:true});

module.exports = mongoose.model('Order', orderSchema);