const {
    check,
    validationResult,
} = require('express-validator');

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    return next();
};

const checkRegister = () => [
    check('email', 'Email is required')
    .not().isEmpty(),
    check('email', 'Email is not valid')
    .isEmail(),
    check('password', 'Password is required')
    .not().isEmpty(),
    check('password', 'Password must be at least 6 characters')
    .isLength({
        min: 6,
    }),
];

const checkProfile = () => [
    check('name', 'Name is not valid')
    .isString()
    .matches(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/)
    .isLength({
        max: 30,
    }),
    check('phone', 'Phone is not valid')
    .isMobilePhone('vi-VN'),
    check('department', 'Department is not valid')
    .isString(),
    check('position', 'Position is not valid')
    .isString(),
];

const checkAvatar = () => [
    check('avatar', 'Avatar is not valid')
    .isURL(),
];

const checkPassword = () => [
    check('password', 'Old password is required')
    .not().isEmpty(),
    check('new_password', 'New password is required')
    .not().isEmpty(),
    check('new_password', 'New password must be at least 6 characters')
    .isLength({
        min: 6,
    }),
];

const checkRequest = () => [
    check('status', 'Status is required')
    .not().isEmpty(),
    check('status', 'Status is not valid')
    .isString(),
    check('description', 'Description is not valid')
    .isString(),
    check('type', 'Type is required')
    .not().isEmpty(),
    check('type', 'Type is not valid')
    .isString(),
    check('equipmentId', 'Equipment ID is not valid')
    .isMongoId(),
    check('description', 'Description is not valid')
    .isString(),
];

const checkEquipment = () => [
    check('id', 'ID is required').notEmpty(),
    check('name', 'Name is not valid')
    .isString(),
    check('status', 'Status is required')
    .not().isEmpty(),
    check('status', 'Status is not valid')
    .isString(),
    check('type', 'Type is required')
    .not().isEmpty(),
    check('type', 'Type is not valid')
    .isString(),
    check('user', 'User is not valid')
    .isMongoId().optional(),
    check('buyTime', 'Buy time is not valid')
    .isDate().optional(),
    check('price', 'Price is not valid')
    .isNumeric().optional(),
    check('model', 'Model is not valid')
    .isString().optional(),
    check('serialNumber', 'Serial number is not valid')
    .isString().optional(),
    check('supplier', 'Supplier is not valid')
    .isString().optional(),

];
const checkObjectId = () => [
    check('id', 'Id is not valid')
    .isMongoId(),
];
module.exports = {
    validator,
    checkRegister,
    checkProfile,
    checkAvatar,
    checkPassword,
    checkObjectId,
    checkRequest,
    checkEquipment
};
