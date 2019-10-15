import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IGetSelfWrapper,
  IOnScrollWrapper,
  IPluginsWrapper,
  IStickySelectorWrapper,
  IStyleWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import { IUniversalPluginCtor } from './plugin-definition.interface';
import { IUniversalComponentProps, IComponentProps } from './props-definition.interface';

/**
 * @browser-compatible
 * @stable [20.09.2019]
 */
export interface IWebComponentEntity<TClassName = string>
  extends IClassNameWrapper<TClassName>,
    IStyleWrapper<React.CSSProperties> {
}

/**
 * @react-native-compatible
 * @stable [22.09.2019]
 */
export interface IUniversalComponentEntity
  extends React.ClassAttributes<AnyT>,  // TODO Replace with React.RefAttributes (ref="string")
    ITitleWrapper,
    IPluginsWrapper<IUniversalPluginCtor | IUniversalPluginCtor[]> {
}

/**
 * @react-native-compatible
 * @stable [16.10.2019]
 */
export interface IUniversalStickyComponentEntity
  extends IUniversalComponentEntity,
    IStickySelectorWrapper {
}

/**
 * @react-native-compatible
 * @stable [22.09.2019]
 */
export interface IUniversalComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps, TState = {}>
  extends React.Component<TProps, TState>,
    IGetSelfWrapper {
}

/**
 * @react-native-compatible
 * @stable [22.09.2019]
 */
export interface IUniversalScrollableComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps,
  TState = {}>
  extends IUniversalComponent<TProps, TState>,
    IOnScrollWrapper {
}

/**
 * @stable [27.09.2019]
 */
export interface IComponent<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IUniversalComponent<TProps, TState> {
}
