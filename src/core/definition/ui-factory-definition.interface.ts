import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IMessageWrapper,
  ITitleWrapper,
  ITouchedWrapper,
  IWrapperClassNameWrapper,
  IWrapperWrapper,
} from '../definitions.interface';
import { IPresetsActionEntity } from './entity-definition.interface';

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
   * @stable [24.12.2020]
   * @param e
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
 * @config-entity
 * @stable [18.03.2020]
 */
export interface IIconConfigEntity
  extends IPresetsActionEntity,
    React.RefAttributes<HTMLDivElement>,
    ITitleWrapper {
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

/**
 * @classes
 * @stable [02.06.2020]
 */
export enum UiFactoryClassesEnum {
  MESSAGE = 'rac-message',
  MESSAGE_BODY = 'rac-message-body',
}
