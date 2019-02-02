import { IError, ApplicationError } from './error.interface';
import { notNilValuesArrayFilter } from '../util';
import { StringNumberT } from '../definitions.interface';

export function convertError(error: number | string | Error | IError): IError {
  if (error instanceof Error) {
    return ApplicationError.create(error.message);
  } else if (error && (error as IError).message) {
    const error0 = error as IError;
    return ApplicationError.create(
        notNilValuesArrayFilter<StringNumberT>(error0.code, error0.message).join(': '),
        error0.code
    );
  }
  return ApplicationError.create(String(error));
}
