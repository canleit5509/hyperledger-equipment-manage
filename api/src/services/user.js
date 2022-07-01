const User = require('../models/user');
const {
    registerUser
} = require('../utils/contract');

const queryUser = async (filter, options) => {
    options.select = options.select || '-password';
    const users = await User.paginate(filter, options);
    return users;
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getUserByEmail = async (email) => {
    return await User.findOne({
        email
    });
};

const getUserByEmailWithPassword = async (email) => {
    return await User.findOne({
        email,
    }).select('+password');
}

const createUser = async (user) => {
    try {
        const wallet = await registerUser(user.email, user.role);
        if (!wallet) {
            return false;
        }
        const newUser = await User.create(user);
        return newUser;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const updateUserById = async (id, userUpdate) => {
    const user = await getUserById(id);
    Object.assign(user, userUpdate);
    await user.save();
    return user;
};

const deleteUserById = async (id) => {
    const user = await getUserById(id);
    await user.remove();
    return user;
};

module.exports = {
    queryUser,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    deleteUserById,
    getUserByEmailWithPassword
};
