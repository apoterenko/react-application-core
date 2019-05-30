import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { ISelectedEntityWrapper, IEntity } from '../definitions.interface';
import { ifNotNilThanValue, nvl, toType } from '../util';

/**
 * @stable [30.05.2019]
 * @param {IEffectsAction} action
 * @returns {boolean}
 */
export const isSelectedEntityInitiallyNotSelected = (action: IEffectsAction): boolean =>
  ifNotNilThanValue<ISelectedEntityWrapper, boolean>(
    action.initialData,
    (selectedWrapper) => R.isNil(selectedWrapper.selected),
    false
  );

/**
 * @stable [30.05.2019]
 * @param {IEffectsAction} action
 * @returns {TEntity extends IEntity}
 */
export const getSelectedEntityFromAction =
  <TEntity extends IEntity = IEntity>(action: IEffectsAction): TEntity =>
    nvl(
      toType<ISelectedEntityWrapper<TEntity>>(action.data).selected,
      toType<ISelectedEntityWrapper<TEntity>>(action.initialData).selected
    );
