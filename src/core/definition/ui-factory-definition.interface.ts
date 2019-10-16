import * as React from 'react';

export interface IUiFactory {

  /**
   * @stable [30.09.2019]
   * @param {Error} e
   * @returns {Element}
   */
  makeWindowErrorElement?(e: Error): Element;

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {React.ReactNode}
   */
  makeReactErrorElement?(e: Error): React.ReactNode;
}
