const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { sendError } = require('../Utils/Utils');


const VerifyAuth = async (req, res, next) => {
    const incomingAuthToken = req.headers.authorization;


    if (!incomingAuthToken) {
        return sendError(res, 401, "Not Authorised");
    }

    if (incomingAuthToken.startsWith('Bearer')) {
        try {
            const token = incomingAuthToken.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if(!req.user){
                return sendError(res,404,"User does not exist")
            }

            next();

        } catch (error) {

            console.log(error)
            return sendError(res, 400, "Invalid Token")

        }

    } else {
        return sendError(res, 400, "Invalid Token")
    }


}

module.exports = { VerifyAuth } 