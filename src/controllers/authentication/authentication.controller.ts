import { RequestHandler, Router } from 'express';
import { compare } from 'bcrypt';
import controllerInterface from '../../interfaces/controller.interface';
import { userModel, UserDto, LogInDto } from '../../models/user.model';
import authenticationService from '../../services/authentication.service';
import wrongCredentialsException from '../../exceptions/wrongCredential.exception';

class AuthenticationController implements controllerInterface {
  public path = '/auth';
  public router = Router();
  private authenticationService = new authenticationService();
  private user = userModel;

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(`${this.path}/register`, this.registration);
    this.router.post(`${this.path}/login`, this.loginUser);
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private registration: RequestHandler = async (req, res, next) => {
    const userData: UserDto = req.body;
    try {
      const { cookie, user } = await this.authenticationService.register(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  private loginUser: RequestHandler = async (req, res, next) => {
    const logInData: LogInDto = req.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await compare(
        logInData.password,
        user.get('password', null, { getters: false }),
      );
      if (isPasswordMatching) {
        const tokenData = this.authenticationService.createToken(user);
        res.setHeader('Set-Cookie', [this.authenticationService.createCookie(tokenData)]);
        res.send(user);
      } else {
        next(new wrongCredentialsException());
      }
    } else {
      next(new wrongCredentialsException());
    }
  }

  private loggingOut: RequestHandler = (req, res, next) => {
    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    res.send(200);
  }
}

export default AuthenticationController;