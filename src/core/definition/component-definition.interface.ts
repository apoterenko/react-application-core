import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IGetSelfWrapper,
  IOnScrollWrapper,
  IPluginsWrapper,
  IStyleWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import { IUniversalPluginCtor } from './plugin-definition.interface';

/**
 * @browserCompatible
 * @stable [20.09.2019]
 */
export interface IWebComponentEntity<TClassName = string>
  extends IClassNameWrapper<TClassName>,
    IStyleWrapper<React.CSSProperties> {
}

/**
 * @reactNativeCompatible
 * @stable [22.09.2019]
 */
export interface IUniversalComponentEntity
  extends React.ClassAttributes<AnyT>,
    ITitleWrapper,
    IPluginsWrapper<IUniversalPluginCtor | IUniversalPluginCtor[]> {
}

/**
 * @reactNativeCompatible
 * @stable [22.09.2019]
 */
export interface IUniversalComponent<TProps extends IUniversalComponentEntity = IUniversalComponentEntity, TState = {}>
  extends React.Component<TProps, TState>,
    IGetSelfWrapper {
}

/**
 * @reactNativeCompatible
 * @stable [22.09.2019]
 */
export interface IUniversalScrollableComponent<TProps extends IUniversalComponentEntity = IUniversalComponentEntity,
  TState = {}>
  extends IUniversalComponent<TProps, TState>,
    IOnScrollWrapper {
}
