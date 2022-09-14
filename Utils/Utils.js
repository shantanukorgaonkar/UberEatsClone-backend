const sendSuccess = (res, statusCode, message, data) => {
    const status = 'Success'
    const result = {
        status,
        message,
        data
    }

    //console.log(data)
    return res.status(statusCode).json(result)

}

const sendError=(res,statusCode,message)=>{

    const status = 'Error'
    const result = {
        status,
        message
    }
    return res.status(statusCode).json(result)
}

module.exports = {
    sendSuccess,
    sendError
}