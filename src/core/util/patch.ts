import * as React from 'react';

import { isFn } from './type';
import { getUiFactory } from '../di/di.services';

/**
 * @stable [03.03.2020]
 * @param {React.Component<{}, {}>} scope
 */
export const patchRenderMethod = (scope: React.Component<{}, {}>): void => {
  const originalRender = scope.render;

  if (isFn(originalRender)) {
    scope.render = () => {
      try {
        return originalRender.call(scope);
      } catch (e) {
        return getUiFactory().makeReactError(e);
      }
    };
  }
};
