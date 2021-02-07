import App from './app';
import helloWorldController from './controllers/helloWorld/Hello';

const app = new App([
  new helloWorldController(),
]);

app.listen();