import { Router, Request, Response } from 'express';
import UserService from '../api/services/UserService';
import UserController from '../api/controllers/UserController';
import validateEmail from '../middlewares/validateEmail';

const userRoutes = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/login',
  validateEmail,
  (req: Request, res: Response) => userController.login(req, res),
);
export default userRoutes;
