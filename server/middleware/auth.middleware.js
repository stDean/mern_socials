const jwt = require('jsonwebtoken');

const { UnauthenticatedError } = require('../errors');

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError("Unauthorized User.");
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = payload;
    req.user = userId;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Invalid Authentication.');
  }
}

module.exports = AuthMiddleware;