const { getAllOrdersService, addSingleOrderService, getYelpRestaurantsService } = require('../services/OrderService');
const { sendSuccess, sendError } = require('../Utils/Utils')

const getOrders = async (req, res) => {
const userId=req.user.id

    try {
        const allOrders = await getAllOrdersService(userId);
        if (allOrders.length === 0) {
            return sendError(res, 404, 'Cannot Find any orders')
        }
        return sendSuccess(res, 200, 'Found all orders', allOrders)
    } catch (error) {
        return sendError(res, 400, error.message)
    }

}

const addOrder = async (req, res) => {
    const order = {...req.body,user:req.user.id}
    try {
        const createdOrder = await addSingleOrderService(order);
        return sendSuccess(res, 201, 'Order Created Sucessfully', createdOrder);
    } catch (error) {
        return sendError(res, 400, error.message)
    }
}


module.exports = { getOrders, addOrder }