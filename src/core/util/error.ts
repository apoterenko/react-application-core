import { StringNumberT } from '../definitions.interface';
import { join } from './join';
import { IErrorMessageEntity } from '../definition';
import {
  notNilValuesArrayFilter,
  notNilValuesFilter,
} from './filter';

/**
 * @stable [12.04.2020]
 * @param {number | string | Error | IErrorMessageEntity} error
 * @returns {IErrorMessageEntity}
 */
export const asErrorMessage = (error: number | string | Error | IErrorMessageEntity): IErrorMessageEntity => {
  const errorMessageEntity = error as IErrorMessageEntity;

  if (error instanceof Error) {
    return {message: error.message};
  } else if (errorMessageEntity && errorMessageEntity.message) {
    return notNilValuesFilter<IErrorMessageEntity, IErrorMessageEntity>({
      message: join(
        notNilValuesArrayFilter<StringNumberT>(errorMessageEntity.code, errorMessageEntity.message),
        ': '
      ),
      code: errorMessageEntity.code,
    });
  }
  return {message: String(error)};
};
