import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IDisabledWrapper,
  IMessageWrapper,
  IOnClickWrapper,
  ITouchedWrapper,
  ITypeWrapper,
  IWrapperClassNameWrapper,
  IWrapperWrapper,
} from '../definitions.interface';
import { IGenericBaseComponentEntity } from './generic-component-definition.interface';

export interface IUiIconFactory {

  /**
   * @stable [19.04.2020]
   * @param {IIconConfigEntity | string} config
   * @returns {JSX.Element}
   */
  makeIcon?(config: IIconConfigEntity | string): JSX.Element;
}

export interface IUiFactory extends IUiIconFactory {

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
}

/**
 * @config-entity
 * @stable [18.03.2020]
 */
export interface IIconConfigEntity
  extends IGenericBaseComponentEntity<HTMLDivElement>,
    IDisabledWrapper,
    IOnClickWrapper,
    ITouchedWrapper,
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
