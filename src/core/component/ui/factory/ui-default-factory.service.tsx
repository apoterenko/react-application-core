import * as React from 'react';
import { injectable } from 'inversify';

import { IUIFactory } from '../../factory';
import { DI_TYPES, lazyInject } from '../../../di';
import { IDomAccessor } from '../../../definition';
import { buildErrorMessage } from '../../../util';

@injectable()
export class UIDefaultFactory implements IUIFactory {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  /**
   * @stable [30.09.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  public makeWindowErrorElement(e: Error): JSX.Element {
    const errorMessageEl = this.domAccessor.createElement();
    this.domAccessor.addClassNameToElement(errorMessageEl, 'rac-window-error-wrapper', 'rac-full-size', 'rac-fixed');
    this.domAccessor.addChild(errorMessageEl);

    errorMessageEl.innerHTML = `
      <div class='rac-window-error rac-alignment-center'>
        ${buildErrorMessage(e, '<br/>')}
      </div>
    `;
    return null;
  }
}
