import express, { Application } from 'express';
import bodyparser from 'body-parser'
import controllerInterface from './interfaces/controller';

class App {
  private app: Application;


  constructor(controllers: controllerInterface[]) {
    this.app = express();
    this.initialiseMiddlewares();
    this.initialiseControllers(controllers);
  }

  public listen() {
    this.app.listen(process.env.HTTP_PORT, () => {
      console.log(`App listening on the port ${process.env.HTTP_PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initialiseMiddlewares() {
    this.app.use(bodyparser.json());
  }

  private initialiseControllers(controllers: controllerInterface[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    })
  }

  private initialiseErrorHandling() {
    throw new Error('not implemented');
  }
}

export default App;