import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    images: [String], 
    date: {
        type: Date,
        required: [true, 'Date is required'],
        validate: {
            validator: function(value) {
                return value > new Date(); // Ensure the date is in the future
            },
            message: 'Date must be in the future'
        }
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
        match: [/^(?:[01]\d|2[0-3]):[0-5]\d$/, 'Time must be in the format HH:MM and within valid range'] // Ensure time is in HH:MM format and valid
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        minlength: [3, 'Location must be at least 3 characters long'],
        maxlength: [100, 'Location cannot exceed 100 characters']
    },
    ticketPrice: {
        type: Number,
        required: [true, 'Ticket price is required'],
        min: [0, 'Ticket price must be a positive number'],
        validate: {
            validator: function(value) {
                return Number.isInteger(value); // Ensure ticketPrice is an integer
            },
            message: 'Ticket price must be an integer'
        }
    },
    peopleLimit: {
        type: Number,
        required: [true, 'People limit is required'],
        min: [0, 'People limit must be a positive number'],
        validate: {
            validator: function(value) {
                return Number.isInteger(value); // Ensure peopleLimit is an integer
            },
            message: 'People limit must be an integer'
        }
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: [true, 'Organizer is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['conference', 'workshop', 'webinar', 'social', 'other'],
            message: 'Invalid category'
        }
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'completed', 'cancelled'],
            message: 'Invalid status'
        },
        default: 'pending'
    },
    freeTickets:{
        type:Number,
        default:0
    }
}, {
    timestamps: true 
});

export default mongoose.model('Event', EventSchema);
