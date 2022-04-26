const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3, //Minimum number of characters
        max: 20,  //Maximum number of characters
        unique: true //Can not have equals name
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: { //user photo
        type: String,
        default: ""
    },
    coverPicture: { //PT -> foto de capa
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followins: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', UserSchema)