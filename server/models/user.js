const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true , "Name is required for creating account"]
    },
    email : {
        type : String,
        required : [true , "Email is required for creating account"],
        unique : [true , "Email already in use."]
    } , 

    points : {
        type : Number,
        default : 0,
    },

    category : {
        type : String
    } , 

    enrolled_playlists : {
        type : Array
    },

    createdAt : {
        type : Date,
        default : new Date(Date.now())
    }
})

module.exports = mongoose.model('User' , UserSchema)