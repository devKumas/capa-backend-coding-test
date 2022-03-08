/**
 * routing-controllers 설정
 */
export const RoutingControllerOptions = {
  cors: true,
  defaultErrorHandler: false,
  controllers: [`${__dirname}/../controllers/*{.ts,.js}`],
  middlewares: [`${__dirname}/../middlewares/*{.ts,.js}`],
  interceptors: [`${__dirname}/../interceptors/*{.ts,.js}`],
};
