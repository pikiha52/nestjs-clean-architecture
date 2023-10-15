import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  statusCode: number;
  message: string;
  error: string;
  data: T;
}

@Injectable()
export class ResponsesInterceptor<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const http = context.switchToHttp();
    const res: any = http.getResponse();
    const statusCode = res.statusCode;
    const message = this.generateMessageResponse(statusCode);

    return next.handle().pipe(
      map((data: any) => {
        const response: Response<T> = {
          statusCode: statusCode,
          message: message,
          error: '',
          data,
        };

        return response;
      }),
    );
  }

  generateMessageResponse(statusCode: number): string {
    let messageResponse: string;
    switch (statusCode) {
      case HttpStatus.OK:
        messageResponse = 'OKE';
        break;
      case HttpStatus.CREATED:
        messageResponse = 'Created';
        break;
      case HttpStatus.BAD_REQUEST:
        messageResponse = 'Please check your request body!';
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        messageResponse = 'Ups, Internal server error!';
        break;
    }

    return messageResponse;
  }
}
