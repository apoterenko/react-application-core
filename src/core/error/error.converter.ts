import { IError, ApplicationError } from './error.interface';

export function convertError(error: number | string | Error | IError): IError {
  if (error instanceof Error) {
    return ApplicationError.create(error.message);
  } else if (error && (error as IError).message) {
    const error0 = error as IError;
    return ApplicationError.create(
        [error0.code, error0.message].filter((i) => !!i).join(' '),
        error0.code
    );
  }
  return ApplicationError.create(String(error));
}
