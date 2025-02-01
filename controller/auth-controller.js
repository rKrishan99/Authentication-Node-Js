const User = require('../model/User');
const bcrypt = require('bcryptjs');

//register controller
const registerUser = async (req, res) => {
    try{
        //extract user information from our request body
        const {username, email, password, role} = req.body;

        //check if the user is already exists in our database 
        const checkExistUser = await User.findOne({$or: [{username}, {email}]});
        if(checkExistUser){
            return res.status(400).json({
                success: false,
                message: 'User is already exists either with same usenamr or same email.'
            });
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newUser.save();
        if(newUser){
            res.status(201).json({
                success: true,
                message: 'User registration successfully!'
            });
        }else{
            res.status(400).json({
                success: false,
                message: 'User registration fail!'
            });
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! please try again.'
        });
    }
};




//login controller
const loginUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        //check user is exixts
        const user = User.findOne({$or: [{username}, {email}]})
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Invalid credentials! Please try again.'
            });
        }

        //if password is match or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(404).json({
                success: false,
                message: 'Invalid password! Please try again.'
            });
        }
        
        //create user token

    }catch(e){
        console.log(e); 
        res.status(500).json({
            success: false,
            message: 'Something went wrong! please try again'
        });
    }
};

module.exports = {registerUser, loginUser}