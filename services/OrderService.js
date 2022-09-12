const {client} = require('./config')

const db = client.db(process.env.DBNAME)



const testConnection = async ()=>{
    
    try {

        const result = await  db.command({ping:1})
        console.log(result)
    } catch (error) {
        console.log(error)
    }

}

module.exports = testConnection
