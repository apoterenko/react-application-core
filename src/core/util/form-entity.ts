import { IEntity } from '../definitions.interface';
import { IReduxHolderFormEntity } from '../definition';
import {
  inProgress,
  WrapperUtils,
} from './wrapper';
import { Selectors } from './select';
import { isObjectNotEmpty } from './object';

/**
 * @stable [11.05.2020]
 * @param {IReduxHolderFormEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityInProgress = <TEntity = IEntity>(entity: IReduxHolderFormEntity<TEntity>): boolean =>
  inProgress(Selectors.form(entity));

/**
 * @stable [11.05.2020]
 * @param {IReduxHolderFormEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityValid = <TEntity = IEntity>(entity: IReduxHolderFormEntity<TEntity>): boolean =>
  WrapperUtils.isValid(Selectors.form(entity));

/**
 * @stable [11.05.2020]
 * @param {IReduxHolderFormEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityChanged = <TEntity = IEntity>(entity: IReduxHolderFormEntity<TEntity>): boolean =>
  isObjectNotEmpty(Selectors.formEntityChanges(entity));

/**
 * @stable [11.05.2020]
 * @param {IReduxHolderFormEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityTouched = <TEntity = IEntity>(entity: IReduxHolderFormEntity<TEntity>): boolean =>
  WrapperUtils.isTouched(Selectors.form(entity));

/**
 * @stable [11.05.2020]
 */
export class FormEntityUtils {
  public static readonly inProgress = isFormEntityInProgress;                                 /* @stable [11.05.2020] */
  public static readonly inValid = isFormEntityValid;                                         /* @stable [11.05.2020] */
  public static readonly isChanged = isFormEntityChanged;                                     /* @stable [11.05.2020] */
  public static readonly isTouched = isFormEntityTouched;                                     /* @stable [11.05.2020] */
}
