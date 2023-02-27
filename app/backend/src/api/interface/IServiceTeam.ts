import Team from '../../database/models/TeamModels';
import ITeam from './ITeam';

export default interface IServiceTeam {
  readAll(dto: ITeam): Promise<Team[]>;
  readById(id: number): Promise<Team | null>;
}
