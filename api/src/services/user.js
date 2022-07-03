const User = require('../models/user');
const {
    registerUser
} = require('../utils/contract');

const queryUser = async (filter, options) => {
    options.select = options.select || '-password';
    filter.deleted = false; // filter out deleted users
    const users = await User.paginate(filter, options);
    return users;
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getUserByIdWithPassword = async (id) => {
    return await User.findById(id).select('+password');
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
        const newUser = await User.create(user);
        const wallet = await registerUser(newUser._id, newUser.role);
        if (!wallet) {
            newUser.delete();
            return false;
        }
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
    await user.delete();
    return user;
};

const getDeletedUserById = async (id) => {
    return await User.findDeleted(id);
};

const restoreUserById = async (id) => {
    const user = await getDeletedUserById(id);
    await user.restore();
    return user;
}

const queryDeletedUser = async (filter, options) => {
    options.select = options.select || '-password';
    filter.deleted = true; // filter out deleted users
    const users = await User.paginate(filter, options);
    return users;
}

const queryWithDeleted = async (filter, options) => {
    options.select = options.select || '-password';
    const users = await User.paginate(filter, options);
    return users;
}


module.exports = {
    queryUser,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    deleteUserById,
    getUserByEmailWithPassword,
    getDeletedUserById,
    restoreUserById,
    queryDeletedUser,
    queryWithDeleted,
    getUserByIdWithPassword
};
