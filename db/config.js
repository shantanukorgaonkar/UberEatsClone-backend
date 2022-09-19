// const { MongoClient } = require("mongodb");
// const mongoose = require('mongoose')                                                                                                                            
// const url = process.env.MONGODB;
// const client = new MongoClient(url);


// async function ConnectDB() {
//     try {
//          await client.connect();
//          console.log("Connected correctly to server");
//         } catch (err) {
//          console.log(err.stack);
//      } 
// }



// module.exports= { ConnectDB, client}

const mongoose = require('mongoose');

async function ConnectDB() {
    try {
         const conn = await mongoose.connect(process.env.MONGODB);
         console.log(`Mongo DB Connected: ${conn.connection.host}`)
        } catch (err) {
         console.log(error);
     } 
}

 module.exports= { ConnectDB }