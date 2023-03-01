import { Request } from 'express';

export default interface userRequest extends Request {
  userEmail?: string;
}
