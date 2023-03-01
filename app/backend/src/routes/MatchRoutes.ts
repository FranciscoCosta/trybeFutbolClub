import { Router, Request, Response } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchService from '../api/services/MatchService';
import MatchController from '../api/controllers/MatchController';

const matchRoutes = Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes.get('/matches', (req: Request, res: Response) =>
  matchController.readAll(req, res));

matchRoutes.patch('/matches/:id/finish', validateToken, (req, res) =>
  matchController.finishMatch(req, res));

matchRoutes.patch('/matches/:id', validateToken, (req, res) =>
  matchController.updateMatch(req, res));

matchRoutes.post('/matches', validateToken, (req, res) =>
  matchController.saveMatch(req, res));

export default matchRoutes;
