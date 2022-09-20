const { addUserToDB, checkIfUserExists, findUserById, findUserByEmail, editEmail, editPassword, checkIfEmailIsSame, deleteUserFromDB, checkIfPasswordIsSame } = require('../services/UserService')
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
    const { email, password } = req.body;

    if (!email || !password) {
        return sendError(res, 400, "Invalid Request");
    }

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return sendError(res, 404, "User Does not exist");
        }

        const isPasswordValid = await verifyPassword(password, user.password);

        if (isPasswordValid) {
            const jwtToken = generateJwtWebToken(user._id);
            const response = { id: user._id, email: user.email, token: jwtToken }
            return sendSuccess(res, 200, "Logged In", response)
        }


    } catch (error) {
        console.log(error)
        return sendError(res, 400, error.message)
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


const updateUserEmail = async (req, res) => {
    const userId = req.user.id;
    const newEmail = req.body.email;

    if (!newEmail) {
        return sendError(res, 400, "No email provided");
    }

    try {
        const isSameEmail = await checkIfEmailIsSame(userId, newEmail);
        if (isSameEmail) {
            return sendError(res, 400, "New email is same as current email.")
        }
        const updatedDoc = await editEmail(userId, newEmail);

        if (!updatedDoc) {
            return sendError(res, 400, "Update failed")
        }

        return sendSuccess(res, 200, "Email Updated", updatedDoc)

    } catch (error) {

        console.log(error.message);
        return sendError(res, 400, error.message)
    }
}

const updateUserPassword = async (req, res) => {
    const userId = req.user;
    const password = req.body.password;

    if (!password) {
        return sendError(res, 400, "Invalid Request")
    }

    try {

        const newHashedPassword = await hashPassword(password);
        const isPasswordSame = await checkIfPasswordIsSame(userId, newHashedPassword);

        if (isPasswordSame) {
            return sendError(res, 400, "New password is same as current email.")
        }
        const updatedDoc = await editPassword(userId, newHashedPassword);

        if (!updatedDoc) {
            return sendError(res, 400, "Update failed")
        }

        return sendSuccess(res, 200, "Email Updated", updatedDoc)


    } catch (error) {
        console.log(error.message);
        return sendError(res, 400, error.message)
    }
}

const deleteUser = async (req, res) => {
    const userId = req.user.id

    try {
        const deletedUser = await deleteUserFromDB(userId);
        if(!deletedUser){
            return sendError(res,400,"Invalid Request")
        }

        return sendSuccess(res,200,"User deleted",deletedUser)
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = { registerUser, loginUser, getLoggedInUserData, updateUserEmail, deleteUser, updateUserPassword };