import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private _service: MatchService;
  constructor(service: MatchService) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const result = await this._service.readAll(inProgress);
    return res.status(200).json(result);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Updated' });
  }

  async saveMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this._service.saveMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(201).json(match);
  }
}
export default MatchController;
