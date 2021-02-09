import express, { Application } from 'express';
import { json } from 'body-parser'
import { connect } from 'mongoose';

import controllerInterface from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';

class App {
  private app: Application;


  constructor(controllers: controllerInterface[]) {
    this.app = express();
    this.connectToTheDatabase();
    this.initialiseMiddlewares();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
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
    this.app.use(json());
  }

  private initialiseControllers(controllers: controllerInterface[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    })
  }

  private initialiseErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
      MONGO_DB,
    } = process.env;
    await connect(`mongodb://${MONGO_PATH}`,
      { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        auth: {
          user: MONGO_USER!,
          password: MONGO_PASSWORD!
        },
        dbName: MONGO_DB
      }
    );
  }
}

export default App;