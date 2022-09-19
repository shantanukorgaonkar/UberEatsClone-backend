const User = require('../models/userModel');

const checkIfUserExists = async (email)=>{
try {
    const result = await User.findOne({email}).select('-password');
    return result;
} catch (error) {
    throw error;
}
}


const addUserToDB = async (user) => {
    try {
        const result = await User.create(user);
        return result;
    } catch (error) {
        throw error;
    }

 
}

module.exports = { addUserToDB , checkIfUserExists }