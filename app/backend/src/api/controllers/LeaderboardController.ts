import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeadearboardController {
  static async home(req: Request, res: Response) {
    const HomeStats = await LeaderboardService.getTeamHome();
    return res.status(200).json(HomeStats);
  }

  static async away(req: Request, res: Response) {
    const AwayStats = await LeaderboardService.getTeamAway();
    return res.status(200).json(AwayStats);
  }

  static async getTeamLeaderboard(req: Request, res: Response) {
    const Stats = await LeaderboardService.getTeamLeaderboard();
    return res.status(200).json(Stats);
  }
}
