import { RequestHandler, Router } from 'express';
import controllerInterface from '../../interfaces/controller.interface';
import { UserDto } from '../../models/user.model';
import authenticationService from '../../services/authentication.service';

class AuthenticationController implements controllerInterface {
  public path = '/auth';
  public router = Router();
  private authenticationService = new authenticationService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(`${this.path}/register`, this.registration);
    this.router.post(`${this.path}/login`, this.loggingIn);
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

  private loggingIn: RequestHandler = (req, res, next) => {
    throw new Error('Method not implemented.');
  }

  private loggingOut: RequestHandler = (req, res, next) => {
    throw new Error('Method not implemented.');
  }
}

export default AuthenticationController;