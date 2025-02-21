import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  
  const authToken = req.cookies.authToken;
console.log('inside auth middleware token ',authToken)
  if (!authToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
