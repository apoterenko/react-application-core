import { ComponentLifecycle } from 'react';

import { IUniversalComponent } from '../entities-definitions.interface';
import { IUniversalComponentProps } from '../props-definitions.interface';

/**
 * @stable [22.09.2019]
 */
export interface IUniversalPlugin<TProps = {}, TState = {}>
  extends ComponentLifecycle<TProps, TState> {
}

/**
 * @stable [22.09.2019]
 */
export type UniversalPluginFactoryT = (component: IUniversalComponent) => IUniversalPlugin;

/**
 * @stable [22.09.2019]
 */
export type IUniversalPluginCtor<TComponent extends IUniversalComponent<TProps, TState> = IUniversalComponent<TProps, TState>,
  TProps extends IUniversalComponentProps = IUniversalComponentProps,
  TState = {}>
  = new(component: TComponent) => IUniversalPlugin<TProps, TState>;
