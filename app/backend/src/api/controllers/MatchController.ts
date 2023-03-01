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
    console.log(id, 'ID do elemento');
    await this._service.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}

export default MatchController;
