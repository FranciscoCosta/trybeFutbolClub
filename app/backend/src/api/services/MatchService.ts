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
    await this.model.findByPk(id);
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.model.findByPk(id);
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async saveMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: Date,
    awayTeamGoals: string,
  ) {
    return this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
  }
}
