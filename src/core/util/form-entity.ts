import { IEntity } from '../definitions.interface';
import { IReduxFormHolderEntity } from '../definition';
import {
  inProgress,
  WrapperUtils,
} from './wrapper';
import { Selectors } from './select';

/**
 * @stable [11.05.2020]
 * @param {IReduxFormHolderEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityInProgress = <TEntity = IEntity>(entity: IReduxFormHolderEntity<TEntity>): boolean =>
  inProgress(Selectors.form(entity));

/**
 * @stable [11.05.2020]
 * @param {IReduxFormHolderEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityValid = <TEntity = IEntity>(entity: IReduxFormHolderEntity<TEntity>): boolean =>
  WrapperUtils.isValid(Selectors.form(entity));

/**
 * @stable [11.05.2020]
 * @param {IReduxFormHolderEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityTouched = <TEntity = IEntity>(entity: IReduxFormHolderEntity<TEntity>): boolean =>
  WrapperUtils.isTouched(Selectors.form(entity));

/**
 * @stable [11.05.2020]
 */
export class FormEntityUtils {
  public static readonly inProgress = isFormEntityInProgress;                                 /* @stable [11.05.2020] */
  public static readonly inValid = isFormEntityValid;                                         /* @stable [11.05.2020] */
  public static readonly isTouched = isFormEntityTouched;                                     /* @stable [11.05.2020] */
}
