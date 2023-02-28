import ILogin from './ILogin';

export default interface IServiceTeam {
  login(dto: ILogin): Promise<any>
}
