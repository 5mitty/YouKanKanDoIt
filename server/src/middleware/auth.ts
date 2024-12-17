import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// Middleware to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return; // Exit the function after sending the response
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return; // Exit the function after sending the response
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (error, user) => {
    if (error) {
      res.status(403).json({ message: 'Invalid token.' });
      return; // Exit the function after sending the response
    }

    req.user = user as JwtPayload; // Attach user info to request
    next(); // Call the next middleware or route handler
  });
};