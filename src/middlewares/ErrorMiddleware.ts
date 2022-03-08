import { Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Logger } from '../utils/Logger';

const logger = new Logger('ErrorMiddleware');

/**
 * Error를 처리하는 미들웨어
 */
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(error: any, req: Request, res: Response): void {
    logger.error(error);

    if (error?.httpCode) {
      res.status(error?.httpCode).json({
        httpCode: error.httpCode,
        name: error.name,
        message: error.message,
        errors: error.errors,
      });
    } else {
      res.status(error.status || 500).json({
        httpCode: error.status || 500,
        name: error.name || 'InternalServerError',
        message: error.message,
        timestamp: error.timestamp,
      });
    }
  }
}
