import * as React from 'react';

import { TypeUtils } from './type';
import { DiServices } from '../di/di.services';

/**
 * @stable [03.03.2020]
 * @param {React.Component<{}, {}>} scope
 */
export const patchRenderMethod = (scope: React.Component<{}, {}>): void => {
  const originalRender = scope.render;

  if (TypeUtils.isFn(originalRender)) {
    scope.render = () => {
      try {
        return originalRender.call(scope);
      } catch (e) {
        return DiServices.uiFactory().makeReactError(e);
      }
    };
  }
};

/**
 * @stable [11.06.2020]
 */
export class PatchUtils {
  public static readonly patchRenderMethod = patchRenderMethod;
}
