// const { client } = require('../db/config');

// const db = client.db(process.env.DBNAME)
const Order = require('../models/orderModel');
const getAllOrdersService = async () => {

    try {
        const orders = await Order.find();
        console.log(orders);
        return orders
    } catch (error) {
        throw error
    }

}

const addSingleOrderService = async (document) => {
    try {
        const createdOrder = await Order.create(document);
        console.log(createdOrder);
        return createdOrder;
    } catch (error) {
        throw error
    }
}



module.exports = {
    getAllOrdersService,
    addSingleOrderService,
}
