import { ModelStatic } from 'sequelize';
import Match from '../../database/models/MatchModels';
import Team from '../../database/models/TeamModels';

export default class UserService {
  protected model: ModelStatic<Match> = Match;

  public async readAll(): Promise<Match[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}
