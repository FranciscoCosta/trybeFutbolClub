import * as jwt from 'jsonwebtoken';
import process = require('process');

export default class Jwt {
  static buildToken(email :string) {
    const SECRET = `${process.env.JWT_SECRET}`;

    return jwt.sign({ email }, SECRET);
  }

  static verifyToken(token: string) {
    const SECRET = `${process.env.JWT_SECRET}`;
    return jwt.verify(token, SECRET);
  }
}
