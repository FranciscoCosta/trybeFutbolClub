import { ModelStatic } from 'sequelize';
import Match from '../../database/models/MatchModels';
import Team from '../../database/models/TeamModels';

export default class UserService {
  protected model: ModelStatic<Match> = Match;

  public async readAll(inProgress: unknown): Promise<Match[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress === true);
    }
    if (inProgress === 'false') {
      return matches.filter((match) => match.inProgress === false);
    }
    return matches;
  }

  public async finishMatch(id: number): Promise<void> {
    console.log(id, 'ID do elemento');
    const match = await this.model.findByPk(id);
    console.log(match, 'Retorno do find');
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}
