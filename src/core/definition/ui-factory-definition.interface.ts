import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IMessageWrapper,
  IWrapperClassNameWrapper,
  IWrapperWrapper,
} from '../definitions.interface';

export interface IUiFactory {

  /**
   * @stable [30.09.2019]
   * @param {Error} e
   * @returns {Element}
   */
  makeWindowError?(e: Error): Element;

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {React.ReactNode}
   */
  makeReactError?(e: Error): React.ReactNode;

  /**
   * @stable [28.11.2019]
   * @param {IUniversalUiMessageConfigEntity} cfg
   * @returns {React.ReactNode}
   */
  makeMessage?(cfg: IUniversalUiMessageConfigEntity): React.ReactNode;
}

/**
 * @stable [28.11.2019]
 */
export interface IUniversalUiMessageConfigEntity
  extends IMessageWrapper<AnyT>,
    IWrapperWrapper<boolean> {
}

/**
 * @stable [28.11.2019]
 */
export interface IUiMessageConfigEntity
  extends IUniversalUiMessageConfigEntity,
    IClassNameWrapper,
    IWrapperClassNameWrapper {
}
