const { MongoClient } = require("mongodb");                                                                                                                            
const url = process.env.MONGODB;
const client = new MongoClient(url);


async function ConnectDB() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
        } catch (err) {
         console.log(err.stack);
     } 
}



module.exports= { ConnectDB, client}