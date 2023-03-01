import { Request, Response, NextFunction } from 'express';
import Team from '../api/services/TeamService';

export default async function validateTeam(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { homeTeamId, awayTeamId } = req.body;

  const team = new Team();

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({
        message: 'It is not possible to create a match with two equal teams',
      });
  }
  const HomeIdVerify = await team.readById(homeTeamId);
  const AwayIdVerify = await team.readById(awayTeamId);
  if (!HomeIdVerify || !AwayIdVerify) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
}
