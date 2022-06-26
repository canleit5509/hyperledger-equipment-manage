const {
  check,
  validationResult,
} = require('express-validator');

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
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
  check('first_name', 'First name is not valid')
    .isString()
    .matches(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/)
    .isLength({
      max: 30,
    }),
  check('last_name', 'Last name is not valid')
    .isString()
    .matches(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/)
    .isLength({
      max: 30,
    }),
  check('phone', 'Phone is not valid')
    .isMobilePhone('vi-VN'),
  check('class_name', 'Class name is not valid')
    .isString(),
];

const checkAvatar = () => [
  check('avatar', 'Avatar is not valid')
    .isURL(),
];

const checkPassword = () => [
  check('old_password', 'Old password is required')
    .not().isEmpty(),
  check('password', 'New password is required')
    .not().isEmpty(),
  check('password', 'New password must be at least 6 characters')
    .isLength({
      min: 6,
    }),
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
  checkObjectId
};
