import mongoose, { Schema } from "mongoose";


const User = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'First name must be at least 3 characters long'],
        maxlength: [30, 'First name cannot exceed 30 characters']
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, 'Username must be atleast 1 characters long'],
        maxlength: [30, 'Username cannot be more than 30 characters']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: function(v) {
                return /[0-9]/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v);
            },
            message: 'Password must contain at least one digit and one special character'
        }
    },
    dob: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'others'],
            message: 'Invalid gender'
        }
    },
    phoneNumber: {
        type: String,
        minlength: [10, 'Phone number must be exactly 10 characters long'],
        maxlength: [10, 'Phone number must be exactly 10 characters long']
    },
    addressLine1: {
        type: String,
    },
    addressLine1:{
        type:String
    },
    postalCode:{
        type:String
    }
}, {
    timestamps: true
});

export default mongoose.model('users', User)