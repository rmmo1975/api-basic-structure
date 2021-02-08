import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import emailAlreadyExistsException from '../exceptions/emailAlreadyExists.exception';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import TokenData from '../interfaces/tokenData.interface';
import { userModel, UserInterface, UserDto } from '../models/user.model';

class Authentication {
  public user = userModel;

  public async register(userData: UserDto) {
    if (
      await this.user.findOne({ email: userData.email })
    ) {
      throw new emailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await hash(userData.password, 10);
    const user = await this.user.create({
      ...userData,
      password: hashedPassword,
    });
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);
    return {
      cookie,
      user,
    };
  }
  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: UserInterface): TokenData {
    const expiresIn = 60 * 60 * 24;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: sign(dataStoredInToken, secret!, { expiresIn }),
    };
  }
}

export default Authentication;