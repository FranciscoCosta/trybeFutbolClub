import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeadearboardController {
  static async home(req: Request, res: Response) {
    console.log('Entri no controller');
    const HomeStats = await LeaderboardService.getTeamHome();
    return res.status(200).json(HomeStats);
  }
}
