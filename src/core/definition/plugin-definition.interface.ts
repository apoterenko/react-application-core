import * as React from 'react';

import {
  IUniversalComponent,
  IUniversalComponentEntity,
} from './component-definition.interface';
import { IUniversalComponentProps } from './props-definition.interface';

/**
 * @react-native-compatible
 * @stable [22.09.2019]
 */
export interface IUniversalPlugin<TProps extends IUniversalComponentProps = {}, TState = {}>
  extends React.ComponentLifecycle<TProps, TState> {
}

/**
 * @react-native-compatible
 * @stable [22.09.2019]
 */
export type UniversalPluginFactoryT = (component: IUniversalComponent) => IUniversalPlugin;

/**
 * @react-native-compatible
 * @stable [22.09.2019]
 */
export type IUniversalPluginCtor<TComponent extends IUniversalComponent<TProps, TState> = IUniversalComponent<TProps, TState>,
                                 TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                 TState = {}>
  = new(component: TComponent) => IUniversalPlugin<TProps, TState>;
