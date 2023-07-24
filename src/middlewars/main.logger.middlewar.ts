import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function mainlogger(req: Request, res: Response, next: NextFunction) {
  Logger.debug('Main logger', 'main');
  next();
}
