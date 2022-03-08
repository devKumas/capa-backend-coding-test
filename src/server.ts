import { App } from './loaders/app';
import { Logger } from './utils/Logger';

const logger = new Logger('Server');

try {
  const app = new App();
  const port = 3000;

  app.createExpressServer(port);
} catch (error) {
  logger.error(error);
}
