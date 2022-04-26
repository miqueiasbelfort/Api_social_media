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
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1,2,3]
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', UserSchema)