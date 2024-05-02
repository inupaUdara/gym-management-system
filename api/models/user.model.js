import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        
         default: 'no name',
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male', 
    },
    dateOfBirth: {
        type: Date,
        default: '04/11/2001',
    },
    address: {
        type: String,
        
         default: 'no address',        
       
    },
    contactNumber: {
        type: String,
         default: '07x xxx xxx',    
    },
    profilePicture:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },

    otp:{
      type : String,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const User = mongoose.model('User',userSchema);

export default User;
