const { getAllOrdersService, addSingleOrderService, getYelpRestaurantsService } = require('../services/OrderService');
const { sendSuccess, sendError } = require('../Utils/Utils')

const getOrders = async (req, res) => {


    try {
        const allOrders = await getAllOrdersService();
        if (allOrders.length === 0) {
            return sendError(res, 404, 'Cannot Find any orders')
        }
        return sendSuccess(res, 200, 'Found all orders', allOrders)
    } catch (error) {
        return sendError(res, 400, error.message)
    }

}

const addOrder = async (req, res) => {
    const order = req.body;
    try {
        const createdOrder = await addSingleOrderService(order);

        if (createdOrder.acknowledged === true) {
            return sendSuccess(res, 201, 'Order Created Sucessfully', createdOrder);
        }

        return sendError(res, 500, 'The order could not be added to the database');

    } catch (error) {
        return sendError(res, 400, error.message)
    }
}


module.exports = { getOrders, addOrder }