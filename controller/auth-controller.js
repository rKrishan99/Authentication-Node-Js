const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Controller
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const checkExistUser = await User.findOne({ $or: [{ username }, { email }] });
        if (checkExistUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with the same username or email.',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.',
        });
    }
};

// Login Controller
const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid credentials! Please try again.',
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials! Please try again.',
            });
        }

        const accessToken = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15m' }
        );

        res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            accessToken,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.',
        });
    }
};

module.exports = { registerUser, loginUser };
