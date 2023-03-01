import { Router, Request, Response } from 'express';
import MatchService from '../api/services/MatchService';
import MatchController from '../api/controllers/MatchController';

const matchRoutes = Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes.get('/matches', (req: Request, res: Response) => matchController.readAll(req, res));
export default matchRoutes;
