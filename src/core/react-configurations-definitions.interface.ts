import * as React from 'react';

import {
  IUniversalLayoutBuilderConfiguration,
  UniversalLayoutBuilderChildrenT,
} from './configurations-definitions.interface';

/**
 * @stable [22.10.2018]
 */
export type ReactLayoutBuilderChildrenT = UniversalLayoutBuilderChildrenT<React.ReactNode>;

/**
 * @stable [22.10.2018]
 */
export interface ILayoutBuilderConfiguration extends IUniversalLayoutBuilderConfiguration<ReactLayoutBuilderChildrenT> {
}
