const { addUserToDB, checkIfUserExists } = require('../services/UserService')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { hashPassword, generateJwtWebToken } = require('../Utils/validation');
const { sendSuccess, sendError } = require('../Utils/Utils');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendError(res, 400, "Invalid Request")
    }
    try {

        const userAlreadyExists = await checkIfUserExists(email);
        if (userAlreadyExists) {
            return sendError(res,400,"User Already Exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = { email, password: hashedPassword }


        const createduser = await addUserToDB(user);
        if (createduser) {
            const jwtToken = generateJwtWebToken(createduser._id);
            return sendSuccess(res, 201, "User is created", { id: createduser._id, email: createduser.email , token:jwtToken})
        } else {
            return sendError(res, 400, "Invalid User Data")
        }
    } catch (error) {
        throw error;
    }
}
 
const loginUser = async (req, res) => {
    res.json({ message: 'Register User' })
}

const getUserData = async (req, res) => {
    res.json({ message: 'Register User' })
}

module.exports = { registerUser, loginUser, getUserData };