// const { client } = require('../db/config');

// const db = client.db(process.env.DBNAME)
const Order = require('../models/orderModel');
const getAllOrdersService = async (id) => {

    try {
        const orders = await Order.find({user:id}).select("_id restaurantName cartItems cartValue");
        return orders
    } catch (error) {
        throw error
    }

}

const addSingleOrderService = async (document) => {
    try {
        const createdOrder = await Order.create(document);
        return createdOrder;
    } catch (error) {
        throw error
    }
}



module.exports = {
    getAllOrdersService,
    addSingleOrderService,
}
