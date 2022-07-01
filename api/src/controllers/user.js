const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USER_ROLES = require('../const/userRoles');
const services = require('../services');

const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;
        // get the Account from the database
        const user = await services.userService.getUserByEmailWithPassword(email);
        // check if the Account exists
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }
        // check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Password is incorrect',
            });
        }

        // create the token
        const token = jwt.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        // return the token
        return res.status(200).json({
            message: 'Login successfully',
            token,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
}
const register = async (req, res) => {
    try {
        const {
            email,
            password,
            role
        } = req.body;
        // check if the Account exists
        const user = await services.userService.getUserByEmail(email);
        if (user) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create the Account
        const newUser = await services.userService.createUser({
            email,
            password: hashedPassword,
            name: req.body.name?req.body.name:null,
            phone: req.body.phone?req.body.phone:null,
            position: req.body.position?req.body.position:null,
            department: req.body.department?req.body.department:null,
            role: role?role:USER_ROLES.USER,
        });
        if (!newUser) {
            return res.status(400).json({
                message: 'User not created',
            });
        }
        // return the Account
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
}

module.exports = {
    login,
    register,
}
