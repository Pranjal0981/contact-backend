const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: [4, "Firstname should be at least 4 characters long"]
    },
    lastName: {
        type: String,
        minlength: [4, "Firstname should be at least 4 characters long"]
    },
    status:{
        type:String,
        enum:['Active','Inactive']
    }
  
}, { timestamps: true });



const User = mongoose.model("User", userSchema);
module.exports = User;