import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private _service: MatchService;
  constructor(service: MatchService) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    const result = await this._service.readAll();
    console.log(result);
    res.status(200).json(result);
  }
}

export default MatchController;
