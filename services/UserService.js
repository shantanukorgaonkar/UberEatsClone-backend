const User = require('../models/userModel');
const { verifyPassword } = require('../Utils/validation');

const checkIfUserExists = async (email) => {
    try {
        const result = await User.findOne({ email }).select('-password');
        return result;
    } catch (error) {
        throw error;
    }
}

const checkIfEmailIsSame = async (id, email) => {
    const document = await User.findById(id);

    if (document.email === email) {

        return true;
    } else {
        return false;
    }
}

const checkIfPasswordIsSame = async (id,password)=>{
    const document = await User.findById(id);
    const isPasswordSame = verifyPassword(password,document.password)

    if(isPasswordSame){
        return true;
    }else{
        return false;
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

const findUserById = async (id) => {
    try {

        const result = await User.findById(id).select('-password');
        return result;
    } catch (error) {
        throw error
    }
}

const findUserByEmail = async (email) => {
    try {
        const result = await User.findOne({ email })
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteUserFromDB = async (id) => {
    try {
        const result = await User.findByIdAndDelete(id)
        return result;
    } catch (error) {
        throw error;
    }

}

const editEmail = async (id, email) => {
    try {
        const document = await User.findById(id);
        document.email = email;
        const updatedDoc = document.save();
        return updatedDoc;
    } catch (error) {
        throw error
    }

}

const editPassword = async (id, password) => {
    try {
        const document = await User.findById(id);
        document.password = password;
        const updatedDoc = document.save();
       
        return updatedDoc
    } catch (error) {
        throw error
    }
}

module.exports = { addUserToDB, checkIfUserExists, findUserById, findUserByEmail, editEmail, editPassword ,checkIfEmailIsSame,deleteUserFromDB,checkIfPasswordIsSame}

