import { Request, Response, Router } from 'express';
import controllerInterface from '../../interfaces/controller.interface';

class HelloController implements controllerInterface {
  public path = '/hello';
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.get(this.path, this.helloWorld);
  }

  private async helloWorld(req: Request, res: Response) {
    res.send('hello world');
  }
}

export default HelloController;