
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userSchema from '../Models/userSchema.js';



export const Register = async (req, res) => {
    try {
        const {
            email = '',
            password = '',
            username = '',
            firstName = '',
            middleName = '',
            lastName = '',
            dob = '',
            gender = '',
            phoneNumber = ''
        } = req.body;
        console.log(req.body)
        if (!email || !password || !username || !firstName || !lastName || !dob || !gender || !phoneNumber) {
            return res.status(400).json({ success: false, message: 'Incomplete details or extra spaces detected' });
        }

        const findUser = await userSchema.findOne({ $or: [{ email }, { username }] });
        if (findUser) {
            return res.status(409).json({ success: false, message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userSchema({
            username,
            email,
            password: hashedPassword,
            firstName,
            middleName,
            lastName,
            dob,
            gender,
            phoneNumber
        });

        await user.save();

        return res.status(201).json({ success: true, message: 'Registered successfully' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.message });
        }
        console.error('Registration error:', error); // Log error server-side
        return res.status(500).json({ success: false, message: 'registration error' });
    }
};