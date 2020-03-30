import { IError } from './error.interface';
import { notNilValuesArrayFilter } from '../util';
import { StringNumberT } from '../definitions.interface';

export function mapErrorObject(error: number | string | Error | IError): IError {
  const errorAsPlainObject = error as IError;

  if (error instanceof Error) {
    return {message: error.message};
  } else if (errorAsPlainObject && errorAsPlainObject.message) {
    return {
      message: notNilValuesArrayFilter<StringNumberT>(errorAsPlainObject.code, errorAsPlainObject.message).join(': '),
      code: errorAsPlainObject.code,
    };
  }
  return {message: String(error)};
}
