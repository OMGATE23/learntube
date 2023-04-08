const mongoose = require('mongoose')

const UserProgressSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : [true , "User ID not given for user progress"]
    },
    playlist_id : {
        type : String,
        required : [true , "Playlist ID not given for user progress"]
    },
    video_id : {
        type : Array
    },
    createdAt : {
        type : Date,
        default : new Date(Date.now())
    }
})

module.exports = mongoose.model('UserProgress' , UserProgressSchema)