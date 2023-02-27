import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModels';
import IServiceTeam from '../interface/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  public async readAll(): Promise<Team[]> {
    return this.model.findAll();
  }
}
