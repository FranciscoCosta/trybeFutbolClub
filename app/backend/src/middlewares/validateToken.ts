import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import Jwt from '../utils/Jwt';

export interface TokenRequest extends Request {
  tokenVerify?: string | jwt.JwtPayload;
}
export default function validateToken(req :TokenRequest, res:Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const tokenVerify = Jwt.verifyToken(token);

    req.tokenVerify = tokenVerify;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
