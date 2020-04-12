import { IErrorMessageEntity } from '../definition';
import { notNilValuesArrayFilter } from '../util';
import { StringNumberT } from '../definitions.interface';

/**
 * TODO
 * @deprecated Use asErrorMessage
 */
export function mapErrorObject(error: number | string | Error | IErrorMessageEntity): IErrorMessageEntity {
  const errorAsPlainObject = error as IErrorMessageEntity;

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
