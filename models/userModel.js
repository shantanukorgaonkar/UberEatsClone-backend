const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    isDeleted :{
        type:Boolean
    }
},{timestamps:{ createdAt:'created_at', updatedAt:'updated_at'}});

module.exports = mongoose.model('User', userSchema);
