import { IError } from './error.interface';

export function convertError(error: number|string|Error|IError): string {
  if (error instanceof Error){
    return error.message;
  } else if (error && (error as IError).message) {
    const _error = error as IError;
    return [_error.code, _error.message].filter((i) => !!i).join(' ');
  }
  return String(error);
}
