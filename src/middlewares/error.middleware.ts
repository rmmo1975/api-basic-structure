import { NextFunction, Request, Response } from 'express';
import httpException from '../exceptions/http.exception';

function errorMiddleware(error: httpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const stack = error.stack || 'nope';
  response
    .status(status)
    .send({
      message,
      status,
      stack
    });
}

export default errorMiddleware;
