import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  private _service: TeamService;
  constructor(service: TeamService) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    const result = await this._service.readAll();
    console.log(result);
    res.status(200).json(result);
  }
}

export default TeamController;
