import * as React from 'react';

import { isFn } from './type';
import { getUiFactory } from '../di/di.services';

/**
 * @stable [02.12.2019]
 * @param {React.Component<{}, {}>} scope
 */
export const patchRenderMethod = (scope: React.Component<{}, {}>): void => {
  const originalRenderer = scope.render;
  if (!isFn(originalRenderer)) {
    return;
  }
  scope.render = (): React.ReactNode => {
    try {
      return originalRenderer.call(scope);
    } catch (e) {
      return getUiFactory().makeReactError(e);
    }
  };
};
