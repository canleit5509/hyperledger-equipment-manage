const jwt = require('jsonwebtoken');

const config = process.env;

const isLoggedIn = (req, res, next) => {
  const bearerToken = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
  if (!bearerToken) {
    return res.status(403).send('A token is required for authentication!');
  }
  try {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send('Invalid token');
  }
  return next();
};

module.exports = isLoggedIn;