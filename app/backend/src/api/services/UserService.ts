import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import Jwt from '../../utils/Jwt';
import ILogin from '../interface/ILogin';
import Itoken from '../interface/Itoken';
import User from '../../database/models/UserModels';
import IUserServices from '../interface/IUserService';

export default class UserService implements IUserServices {
  protected model: ModelStatic<User> = User;

  async login({ email, password }: ILogin): Promise<Itoken | undefined> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;

    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword) return undefined;

    const token = Jwt.buildToken(email);
    return { token };
  }

  async loginRole(email: string): Promise<string | undefined> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;

    return user.role;
  }
}
