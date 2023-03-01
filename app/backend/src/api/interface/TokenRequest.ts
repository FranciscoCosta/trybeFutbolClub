import * as jwt from 'jsonwebtoken';

export default interface TokenRequest extends Request {
  tokenVerify?: string | jwt.JwtPayload;
}
