import * as R from 'ramda';

import { IGenericTabEntity } from '../definition';
import { IActiveValueWrapper} from '../definitions.interface';

/**
 * @stable [23.03.2020]
 * @param {IActiveValueWrapper} wrapper
 * @param {IGenericTabEntity} tab
 * @returns {boolean}
 */
export const isTabActive = (wrapper: IActiveValueWrapper,
                            tab: IGenericTabEntity): boolean =>
  R.isNil(wrapper)
    ? false
    : (
      R.isNil(wrapper.activeValue)
        ? !!tab.active
        : wrapper.activeValue === tab.value
    );
