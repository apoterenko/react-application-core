import { IEntity } from '../definitions.interface';
import { IFormEntity } from '../definition';
import {
  inProgress,
  isTouched,
  isValid,
} from './wrapper';
import { Selectors } from './select';
import { isObjectNotEmpty } from './object';

/**
 * @stable [11.05.2020]
 * @param {IFormEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityInProgress = <TEntity = IEntity>(entity: IFormEntity<TEntity>): boolean =>
  inProgress(Selectors.form(entity));

/**
 * @stable [11.05.2020]
 * @param {IFormEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityValid = <TEntity = IEntity>(entity: IFormEntity<TEntity>): boolean =>
  isValid(Selectors.form(entity));

/**
 * @stable [11.05.2020]
 * @param {IFormEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityChanged = <TEntity = IEntity>(entity: IFormEntity<TEntity>): boolean =>
  isObjectNotEmpty(Selectors.formEntityChanges(entity));

/**
 * @stable [11.05.2020]
 * @param {IFormEntity<TEntity>} entity
 * @returns {boolean}
 */
const isFormEntityTouched = <TEntity = IEntity>(entity: IFormEntity<TEntity>): boolean =>
  isTouched(Selectors.form(entity));

/**
 * @stable [11.05.2020]
 */
export class FormEntityUtils {
  public static readonly inProgress = isFormEntityInProgress;                                 /* @stable [11.05.2020] */
  public static readonly inValid = isFormEntityValid;                                         /* @stable [11.05.2020] */
  public static readonly isChanged = isFormEntityChanged;                                     /* @stable [11.05.2020] */
  public static readonly isTouched = isFormEntityTouched;                                     /* @stable [11.05.2020] */
}
