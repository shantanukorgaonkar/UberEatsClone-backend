const { client } = require('../db/config');

const db = client.db(process.env.DBNAME)

const getAllOrdersService = async () => {

    try {
        const ordersCollection = db.collection('orders')
        const result = await ordersCollection.find().toArray()
        //console.log(result)
        return result
    } catch (error) {
        throw error
    }

}

const addSingleOrderService = async (document) => {
    try {
        const ordersCollection = db.collection('orders');
        const result = ordersCollection.insertOne(document);
        return result;
    } catch (error) {
        throw error
    }
}



module.exports = {
    getAllOrdersService,
    addSingleOrderService,
}
