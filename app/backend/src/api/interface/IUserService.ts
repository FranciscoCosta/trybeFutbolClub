import ILogin from './ILogin';
import IUser from './IUser';

export default interface IServiceUser {
  login(dto: ILogin): Promise<IUser | unknown>
}
