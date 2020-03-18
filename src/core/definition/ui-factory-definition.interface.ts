import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IMessageWrapper,
  ITypeWrapper,
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
   * @stable [02.12.2019]
   * @param {Error} e
   * @param {boolean} logging
   * @returns {React.ReactNode}
   */
  makeReactError?(e: Error, logging?: boolean): React.ReactNode;

  /**
   * @stable [28.11.2019]
   * @param {IUniversalUiMessageConfigEntity} cfg
   * @returns {React.ReactNode}
   */
  makeMessage?(cfg: IUniversalUiMessageConfigEntity): React.ReactNode;

  /**
   * @stable [18.03.2020]
   * @param {IIconConfigEntity | string} config
   * @returns {JSX.Element}
   */
  makeIcon?(config: IIconConfigEntity | string): JSX.Element;
}

/**
 * @config-entity
 * @stable [18.03.2020]
 */
export interface IIconConfigEntity
  extends IClassNameWrapper<string | ((...args: AnyT[]) => string)>,
    ITypeWrapper {
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
