const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

require("dotenv").config()



const UserSchema = new mongoose.Schema({

    email: {

        type: String,

        unique: true,

        required: "Your email is required",

        trim: true

    },

    username: {

        type: String,

        required: "Your username is required"

    },

    password: {

        type: String,

        required: "Your password is required",

        max: 100
    },

    firstName: {

        type: String,

        required: "First Name is required",


        max: 100
    },

    lastName: {

        type: String,

        required: "Last Name is required",

        max: 100

    },

    active: {

      type: Boolean,

      default: false

    },

    otp: {

      type: String,

      required: true,

    },
    
    timeOptCreate :{
        type: String,
    },
    timeOptExpired :{

        type: String,

    },

    resetPasswordToken: {

        type: String

    },

    resetPasswordExpires: {

        type: String

    }

}, 

{timestamps: true});


// UserSchema.methods.generateJWT = function() {
//     const today = new Date();
//     const expirationDate = new Date(today);
//     expirationDate.setDate(today.getDate() + 60);

//     let payload = {
//         id: this._id,
//         email: this.email,
//         username: this.username,
//         firstName: this.firstName,
//         lastName: this.lastName,
//     };

//     return jwt.sign(payload, process.env.SECRET, {
//         expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
//     });
// };

module.exports = mongoose.model("Users", UserSchema);