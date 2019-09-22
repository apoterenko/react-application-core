import { ComponentLifecycle } from 'react';

import {
  IUniversalComponent,
  IUniversalComponentEntity,
} from './component-definition.interface';

/**
 * @reactNativeCompatible
 * @stable [22.09.2019]
 */
export interface IUniversalPlugin<TProps = {}, TState = {}>
  extends ComponentLifecycle<TProps, TState> {
}

/**
 * @reactNativeCompatible
 * @stable [22.09.2019]
 */
export type UniversalPluginFactoryT = (component: IUniversalComponent) => IUniversalPlugin;

/**
 * @reactNativeCompatible
 * @stable [22.09.2019]
 */
export type IUniversalPluginCtor<TComponent extends IUniversalComponent<TProps, TState> = IUniversalComponent<TProps, TState>,
  TProps extends IUniversalComponentEntity = IUniversalComponentEntity,
  TState = {}>
  = new(component: TComponent) => IUniversalPlugin<TProps, TState>;
