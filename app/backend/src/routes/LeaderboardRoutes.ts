import { Router, Request, Response } from 'express';
import LeaderboardController from '../api/controllers/LeaderboardController';

const leaderboardRoutes = Router();
console.log('Entrei na rota');
leaderboardRoutes.get('/leaderboard/home', (req: Request, res: Response) =>
  LeaderboardController.home(req, res));

leaderboardRoutes.get('/leaderboard/away', (req: Request, res: Response) =>
  LeaderboardController.away(req, res));

leaderboardRoutes.get('/leaderboard', (req: Request, res: Response) =>
  LeaderboardController.getTeamLeaderboard(req, res));

export default leaderboardRoutes;
