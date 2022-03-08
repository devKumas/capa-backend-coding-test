import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { RoutingControllerOptions } from '../configs/RoutingConfig';

export function useSwagger(app: express.Application) {
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, RoutingControllerOptions, {
    info: {
      title: 'Store 조회',
      version: '1.0.0',
    },
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
}
