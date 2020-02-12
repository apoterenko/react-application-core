import * as R from 'ramda';

import { IActiveValueWrapper } from '../../definitions.interface';
import {
  IGenericTabEntity,
} from '../../definition';

/**
 * @stable [30.08.2018]
 * @param {IActiveValueWrapper} activeValueWrapper
 * @param {IGenericTabEntity} tab
 * @returns {boolean}
 */
export const isTabActive = (activeValueWrapper: IActiveValueWrapper, tab: IGenericTabEntity): boolean =>
  R.isNil(activeValueWrapper.activeValue) ? !!tab.active : activeValueWrapper.activeValue === tab.value;
