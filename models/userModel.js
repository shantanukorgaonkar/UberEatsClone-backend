const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
