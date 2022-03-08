import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

@Interceptor()
export class NameCorrectionInterceptor implements InterceptorInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(action: Action, content: any) {
    const jsonData = {
      success: true,
      httpCode: action.response.statusCode,
      data: content,
    };
    return jsonData;
  }
}
