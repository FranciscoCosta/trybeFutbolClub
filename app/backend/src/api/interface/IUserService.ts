import ILogin from './ILogin';

export default interface IServiceUser {
  login(dto: ILogin): Promise<unknown>
}
