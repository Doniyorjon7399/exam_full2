import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((response) => {
        const result: any = {
          success: true,
        };

        if (response?.message) {
          result.message = response.message;
        }

        if (response?.data !== undefined && response?.data !== null) {
          result.data = response.data;
        } else {
          result.data = response;
        }

        return result;
      }),
    );
  }
}
