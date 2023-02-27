import { Router, Request, Response } from 'express';
import TeamService from '../api/services/TeamService';
import TeamController from '../api/controllers/TeamController';

const teamRoutes = Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/teams', (req: Request, res: Response) => teamController.readAll(req, res));
teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.readById(req, res));
export default teamRoutes;
