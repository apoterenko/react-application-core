import * as React from 'react';
import { injectable } from 'inversify';

import { buildErrorMessage } from '../../../util';
import { DI_TYPES, lazyInject } from '../../../di';
import { IDomAccessor } from '../../../definition';
import { IUIFactory } from '../../factory';

@injectable()
export class UIDefaultFactory implements IUIFactory {
  @lazyInject(DI_TYPES.DomAccessor) protected readonly domAccessor: IDomAccessor;

  /**
   * @stable [30.09.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  public makeWindowErrorElement(e: Error): Element {
    const errorMessageEl = this.domAccessor.createElement();
    this.domAccessor.addClassNameToElement(errorMessageEl, 'rac-window-error-wrapper', 'rac-full-size', 'rac-fixed');
    this.domAccessor.addChild(errorMessageEl);

    errorMessageEl.innerHTML = `
      <div class='rac-window-error rac-alignment-center'>
        ${buildErrorMessage(e, '<br/>')}
      </div>
    `;
    return errorMessageEl;
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {React.ReactNode}
   */
  public makeReactErrorElement(e: Error): React.ReactNode {
    return (
      <div className='rac-full-size rac-fixed'>
        <div className='rac-alignment-center'>
          {e.message}<br/><br/>
          {e.stack}
        </div>
      </div>
    );
  }
}
