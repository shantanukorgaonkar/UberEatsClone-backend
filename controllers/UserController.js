const { addUserToDB, checkIfUserExists, findUserById, findUserByEmail } = require('../services/UserService')
const { hashPassword, generateJwtWebToken, verifyPassword } = require('../Utils/validation');
const { sendSuccess, sendError } = require('../Utils/Utils');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendError(res, 400, "Invalid Request")
    }
    try {

        const userAlreadyExists = await checkIfUserExists(email);
        if (userAlreadyExists) {
            return sendError(res, 400, "User Already Exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = { email, password: hashedPassword }


        const createduser = await addUserToDB(user);
        if (createduser) {
            const jwtToken = generateJwtWebToken(createduser._id);
            const response = { id: createduser._id, email: createduser.email, token: jwtToken }
            return sendSuccess(res, 201, "User is created", response)
        } else {
            return sendError(res, 400, "Invalid User Data")
        }
    } catch (error) {

        console.log(error);
        return sendError(res, 400, error.message)
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return sendError(res, 400, "Invalid Request");
    }

    try {
        const user = await findUserByEmail(email);

        if(!user){
            return sendError(res,404,"User Does not exist");
        }

        const isPasswordValid = await verifyPassword(password,user.password);

        if(isPasswordValid){
            const jwtToken = generateJwtWebToken(user._id);
            const response = {id:user._id,email:user.email,token:jwtToken}
            return sendSuccess(res,200,"Logged In",response)
        }


    } catch (error) {
        console.log(error)
        return sendError(res,400,error.message)
    }
}

const getLoggedInUserData = async (req, res) => {

    try {
        const loggedInUser = await findUserById(req.user.id)
        if (!loggedInUser) {
            return sendError(res, 400, "User does not exist")
        }

        return sendSuccess(res, 200, "User Found", { id: loggedInUser._id, email: loggedInUser.email })
    } catch (error) {
        console.log(error);
        return sendError(res, 400, error.message)
    }
}

module.exports = { registerUser, loginUser, getLoggedInUserData };