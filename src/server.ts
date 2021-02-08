import App from './app';
import helloWorldController from './controllers/helloWorld/hello.controller';
import authenticationController from './controllers/authentication/authentication.controller';

const app = new App([
  new helloWorldController(),
  new authenticationController(),
]);

app.listen();