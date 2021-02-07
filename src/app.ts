import express, { Application } from 'express';
import bodyparser from 'body-parser'
import controllerInterface from './interfaces/controller';
import { connect } from 'mongoose';

class App {
  private app: Application;


  constructor(controllers: controllerInterface[]) {
    this.app = express();
    this.connectToTheDatabase();
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