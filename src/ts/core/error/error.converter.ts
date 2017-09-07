import { IError } from './error.interface';

export function convertError(error: number | string | Error | IError): string {
  if (error instanceof Error) {
    return error.message;
  } else if (error && (error as IError).message) {
    const error0 = error as IError;
    return [error0.code, error0.message].filter((i) => !!i).join(' ');
  }
  return String(error);
}
