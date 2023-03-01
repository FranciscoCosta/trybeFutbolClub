import { Request, Response } from 'express';
import UserService from '../services/UserService';

import { TokenRequest } from '../../middlewares/validateToken';

class UserController {
  private _service: UserService;
  constructor(service: UserService) {
    this._service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this._service.login({ email, password });

    if (!token) res.status(401).json({ message: 'Invalid email or password' });
    res.status(200).json(token);
  }

  async loginRole(req: TokenRequest, res: Response) {
    const email = typeof req.tokenVerify === 'object' ? req.tokenVerify.email : undefined;
    console.log(email, 'EStou aqui');
    const role = await this._service.loginRole(email);
    res.status(200).json({ role });
  }
}

export default UserController;
