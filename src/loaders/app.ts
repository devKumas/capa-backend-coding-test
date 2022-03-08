import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';

import { useSwagger } from '../utils/Swagger';
import { RoutingControllerOptions } from '../configs/RoutingConfig';
import { Logger, stream } from '../utils/Logger';

const logger = new Logger('App');

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
  }

  private setMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('combined', { stream }));
  }

  public async createExpressServer(port: number): Promise<void> {
    try {
      useContainer(Container);
      useExpressServer(this.app, RoutingControllerOptions);
      useSwagger(this.app);

      http.createServer(this.app).listen(port, () => {
        logger.info(`http Server is started on port ${port}`);
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
