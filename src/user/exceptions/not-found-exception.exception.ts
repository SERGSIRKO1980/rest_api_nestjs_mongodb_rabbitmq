import { HttpException, HttpStatus } from '@nestjs/common';

interface Error {
  message?: never;
  error?: never;
  created?: never;
  [k: string]: string;
}
export class NotFounUserException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        message: 'user not found',
        error: 'not_found_user_exception',
        created: new Date(),
        ...error,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
