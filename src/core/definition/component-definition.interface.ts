import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IGetSelfWrapper,
  IPluginsWrapper,
  IStyleWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import { IUniversalPluginCtor } from './plugin-definition.interface';
import {
  IComponentProps,
  IUniversalComponentProps,
} from './props-definition.interface';

/**
 * @browser-compatible
 * @stable [20.09.2019]
 */
export interface IWebComponentEntity
  extends IClassNameWrapper<string | ((...args: AnyT[]) => string)>,
    IStyleWrapper<React.CSSProperties> {
}

/**
 * @react-native-compatible
 * @stable [27.02.2020]
 */
export interface IGenericComponentEntity<TComponent = AnyT>
  extends React.ClassAttributes<TComponent>, // TODO React.ClassAttributes -> React.RefAttributes (ref="string")
    ITitleWrapper<string | boolean> {
}

/**
 * @react-native-compatible
 * @stable [22.09.2019]
 */
export interface IUniversalComponentEntity
  extends IGenericComponentEntity<AnyT>,
    IPluginsWrapper<IUniversalPluginCtor | IUniversalPluginCtor[]> {
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
 * @stable [27.09.2019]
 */
export interface IComponent<TProps extends IComponentProps = IComponentProps,
  TState = {}>
  extends IUniversalComponent<TProps, TState> {
}

/**
 * @ctor
 * @react-native-compatible
 * @stable [23.10.2019]
 */
export interface IUniversalComponentCtor<TProps extends IUniversalComponentProps = IUniversalComponentProps, TState = {}>
  extends React.ComponentClass<TProps, TState> {
}

/**
 * @ctor
 * @stable [23.10.2019]
 */
export interface IComponentCtor<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IUniversalComponentCtor<TProps, TState> {
}

/**
 * @stable [09.03.2020]
 */
export enum ComponentClassesEnum {
  CALENDAR_BASE_DIALOG = 'rac-calendar-base-dialog',   // TODO
  CALENDAR_DIALOG = 'rac-calendar-dialog',   // TODO
  CALENDAR_DIALOG_RANGE_INPUT_SEPARATOR = 'rac-calendar-dialog__range-input-separator',   // TODO
  CALENDAR_INLINE_DIALOG = 'rac-calendar-inline-dialog',  // TODO
  OVERFLOW_HIDDEN = 'rac-overflow-hidden',
}
