import * as React from 'react';

import {
  IGenericComponent,
  IGenericComponentCtor,
  IGenericComponentProps,
} from './generic-component-definition.interface';

/**
 * @plugin
 * @stable [10.04.2020]
 */
export interface IGenericPlugin<TProps extends IGenericComponentProps = IGenericComponentProps, TState = {}>
  extends React.ComponentLifecycle<TProps, TState> {
}

/**
 * @factory
 * @stable [10.04.2020]
 */
export type GenericPluginFactoryT =
  <TProps extends IGenericComponentProps = IGenericComponentProps, TState = {}>(component: IGenericComponent) =>
    IGenericPlugin<TProps, TState>;

/**
 * @ctor
 * @stable [10.04.2020]
 */
export type GenericPluginCtorT
  <TComponent extends IGenericComponent<TProps, TState> = IGenericComponent<TProps, TState>,
    TProps extends IGenericComponentProps = IGenericComponentProps,
    TState = {}>
  = new(component: TComponent) => IGenericPlugin<TProps, TState>;

/**
 * @stable [21.04.2020]
 */
export type GenericPluginsMapT = Map<IGenericComponentCtor, GenericPluginFactoryT[]>;
