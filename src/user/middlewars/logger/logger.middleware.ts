import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: () => void) {
    const {body} = req;
    this.logger.verbose(`Body is ${JSON.stringify(body, null, 2)}`);
    next();
  }
}
