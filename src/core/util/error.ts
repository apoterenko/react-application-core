import { IEffectsAction } from 'redux-effects-promise';

import { FilterUtils } from './filter';
import { IErrorMessageEntity } from '../definition';
import { JoinUtils } from './join';
import { TypeUtils } from './type';

/**
 * @stable [26.01.2021]
 * @param error
 */
const asErrorMessage = (error: number | string | Error | IErrorMessageEntity | IEffectsAction): IErrorMessageEntity => {
  switch (true) {
    case error instanceof Error:
      return {message: (error as Error).message};
    case TypeUtils.isActionLike(error):
      const errorAction = error as IEffectsAction;
      return {message: asErrorMessage(errorAction.error).message};
    case TypeUtils.isErrorMessageEntityLike(error):
      const {
        code,
        message,
      } = error as IErrorMessageEntity;
      return FilterUtils.notNilValuesFilter<IErrorMessageEntity, IErrorMessageEntity>({
        message: JoinUtils.join(
            [
              code,
              message
            ],
            ': '
        ),
        code,
      });
  }
  return {message: String(error)};
};

/**
 * @stable [26.01.2021]
 */
export class ErrorUtils {
  public static readonly asErrorMessage = asErrorMessage;
}
