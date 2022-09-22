const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword
}

const verifyPassword = async (password, hashedPassword) => {

    try {
        const isValid = await bcrypt.compare(password, hashedPassword);
        return isValid;
    } catch (error) {
        throw error;
    }


}

const generateJwtWebToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

module.exports = { hashPassword, generateJwtWebToken, verifyPassword }