import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    const url = request.originalUrl;
    const method = request.method;
    const handler = context.getHandler().name;

    return next.handle().pipe(
      tap(() => {
        const elapsedTime = Date.now() - now;
        const timestamp = new Date().toLocaleDateString('zh-TW', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
          timeZone: 'Asia/Taipei',
        });
        console.log(
          `${timestamp}     LOG [${method} - ${url}] ${handler} costed +${elapsedTime}ms`,
        );
      }),
    );
  }
}
