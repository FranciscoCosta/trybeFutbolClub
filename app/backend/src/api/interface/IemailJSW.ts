import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

export default interface CustomRequest extends Request {
  user?: jwt.JwtPayload;
}
