// middle ware to authorize user
const authorization = (...roles) => (req, res, next) => {
  console.log(req.user);
  if (roles.includes(req.user.role)) {
    next();
  } else {
    res.status(403).send({
      message: 'You are not authorized to perform this action',
    });
  }
};

module.exports = authorization;
