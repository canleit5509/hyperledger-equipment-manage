const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USER_ROLES = require('../const/userRoles');
const services = require('../services');
const { query, invoke, prettyJSONString } = require('../utils/contract');

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
        const refreshToken = jwt.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        }); 

        user.password = undefined;
        // return the token
        return res.status(200).json({
            message: 'Login successfully',
            token: token,
            user: user,
            refreshToken: refreshToken,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
}

const refreshToken = async (req, res) => {
    try {
        let {
            refreshToken,
        } = req.body;
        if(!refreshToken) {
            return res.status(400).json({
                message: 'Refresh token is required',
            });
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await services.userService.getUserById(decoded._id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }
        const token = jwt.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.status(200).json({
            message: 'Refresh successfully',
            token: token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
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
            name: req.body.name ? req.body.name : null,
            phone: req.body.phone ? req.body.phone : null,
            position: req.body.position ? req.body.position : null,
            department: req.body.department ? req.body.department : null,
            role: role ? role : USER_ROLES.USER,
        });
        if (!newUser) {
            return res.status(400).json({
                message: 'User not created',
            });
        }
        newUser.password = undefined;
        // return the Account
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await services.userService.getUserById(req.user._id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const user = await services.userService.getUserById(req.user._id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }

        const userProfile = {
            name: req.body.name ? req.body.name : user.name,
            phone: req.body.phone ? req.body.phone : user.phone,
            position: req.body.position ? req.body.position : user.position,
            department: req.body.department ? req.body.department : user.department,
            avatar: req.body.avatar ? req.body.avatar : user.avatar,
        }
        const updatedUser = await services.userService.updateUserById(user._id, userProfile);
        if (!updatedUser) {
            return res.status(400).json({
                message: 'User not updated',
            });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const changePassword = async (req, res) => {
    try {
        const user = await services.userService.getUserByIdWithPassword(req.user._id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Password is incorrect',
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.new_password, 10);
        const updatedUser = await services.userService.updateUserById(user._id, {
            password: hashedPassword,
        });
        if (!updatedUser) {
            return res.status(400).json({
                message: 'User not updated',
            });
        }
        updatedUser.password = undefined;
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const changeAvatar = async (req, res) => {
    try {
        const id = req.params.id || req.user._id;
        const user = await services.userService.getUserById(id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }
        const updatedUser = await services.userService.updateUser(user._id, {
            avatar: req.body.avatar,
        });
        if (!updatedUser) {
            return res.status(400).json({
                message: 'User not updated',
            });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const {
            page,
            limit,
            sort,
            order,
        } = req.query;
        let options = {
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
            sort: sort ? sort : 'createdAt',
            order: order ? order : 'desc',
        }
        const users = await services.userService.queryUser({}, options);
        if (!users) {
            return res.status(204).json({
                message: 'Users not found',
            });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await services.userService.getUserById(req.params.id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }
        const deletedUser = await services.userService.deleteUserById(user._id);
        if (!deletedUser) {
            return res.status(400).json({
                message: 'User not deleted',
            });
        }
        return res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const getDeletedUsers = async (req, res) => {
    try {
        const {
            page,
            limit,
            sort,
            order,
        } = req.query;
        let options = {
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
            sort: sort ? sort : 'createdAt',
            order: order ? order : 'desc',
        }
        const users = await services.userService.queryDeletedUser({}, options);
        if (!users) {
            return res.status(204).json({
                message: 'Users not found',
            });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const getUsersWithDeleted = async (req, res) => {
    try {
        const {
            page,
            limit,
            sort,
            order,
        } = req.query;
        let options = {
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
            sort: sort ? sort : 'createdAt',
            order: order ? order : 'desc',
        }
        const users = await services.userService.queryWithDeleted({}, options);
        if (!users) {
            return res.status(204).json({
                message: 'Users not found',
            });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const restoreUser = async (req, res) => {
    try {
        const user = await services.userService.getUserById(req.params.id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }
        const restoredUser = await services.userService.restoreUserById(user._id);
        if (!restoredUser) {
            return res.status(400).json({
                message: 'User not restored',
            });
        }
        return res.status(200).json(restoredUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const getMyEquipments = async (req, res) => {
    try {
        const devices = await services.equipmentService.getUserOwnEquipments(req.user._id);
        if (!devices) {
            return res.status(204).json({
                message: 'Devices not found',
            });
        }
        return res.status(200).json(devices);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await services.userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await services.userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        var data = {
            name: req.body.name ? req.body.name : null,
            phone: req.body.phone ? req.body.phone : null,
            position: req.body.position ? req.body.position : null,
            department: req.body.department ? req.body.department : null,
            role: role ? role : USER_ROLES.USER,
        }
        const updatedUser = await services.userService.updateUserById(user._id, data);
        if (!updatedUser) {
            return res.status(400).json({
                message: 'User not updated',
            });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const addEquipment = async (req, res) => {
    try {
        const user = await services.userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const equipment = await services.equipmentService.getEquipmentById(req.body.equipmentId);
        if (!equipment) {
            return res.status(404).json({
                message: 'Equipment not found',
            });
        }
        let result = await invoke("pushEquipment", user._id, equipment._id);
        result = JSON.parse(result);
        if (!result) {
            return res.status(400).json({
                message: 'Equipment not added',
            });
        }
        return res.status(200).json((result));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const removeEquipment = async (req, res) => {
    try {
        const user = await services.userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const equipment = await services.equipmentService.getEquipmentById(req.body.equipmentId);
        if (!equipment) {
            return res.status(404).json({
                message: 'Equipment not found',
            });
        }
        let result = await invoke("popEquipment", user._id, equipment._id);
        result = JSON.parse(result);
        if (!result) {
            return res.status(400).json({
                message: 'Equipment not removed',
            });
        }
        return res.status(200).json((result));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}



module.exports = {
    login,
    register,
    getProfile,
    updateProfile,
    changePassword,
    changeAvatar,
    getAllUsers,
    deleteUser,
    getDeletedUsers,
    restoreUser,
    getUsersWithDeleted,
    getMyEquipments,
    getUserById,
    updateUser,
    addEquipment,
    removeEquipment,
    refreshToken
}
