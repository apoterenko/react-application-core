import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IGetSelfWrapper,
  IPluginsWrapper,
  IStyleWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import { GenericPluginCtorT } from './plugin-definition.interface';
import {
  IComponentProps,
  IUniversalComponentProps,
} from './props-definition.interface';

/**
 * @deprecated
 */
export interface IWebComponentEntity
  extends IClassNameWrapper<string | ((...args: AnyT[]) => string)>,
    IStyleWrapper<React.CSSProperties> {
}

/**
 * @generic-entity
 * @stable [27.02.2020]
 */
export interface IGenericBaseComponentEntity<TComponent = AnyT>
  extends React.RefAttributes<TComponent>,
    IClassNameWrapper<string | ((...args: AnyT[]) => string)>,
    IStyleWrapper<React.CSSProperties>,
    ITitleWrapper<string | boolean> {
}

/**
 * @generic-entity
 * @stable [27.02.2020]
 */
export interface IGenericComponentEntity<TComponent = AnyT>
  extends IGenericBaseComponentEntity<TComponent> {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IGenericBaseComponentProps
  extends IGenericBaseComponentEntity {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IGenericComponentProps
  extends IGenericComponentEntity {
}

/**
 * @deprecated
 */
export interface IUniversalComponentEntity
  extends IGenericComponentEntity<AnyT>,
    IPluginsWrapper<GenericPluginCtorT | GenericPluginCtorT[]> {
}

/**
 * @component
 * @stable []
 */
export interface IGenericComponent<TProps extends IGenericComponentProps = IGenericComponentProps, TState = {}>
  extends React.PureComponent<TProps, TState> {
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
  ABSOLUTE = 'rac-absolute',
  ALIGNMENT_CENTER = 'rac-alignment-center',
  ANDROID = 'rac-android',
  CALENDAR_DIALOG_RANGE_INPUT_SEPARATOR = 'rac-calendar-dialog__range-input-separator',   // TODO
  CHROME = 'rac-chrome',
  DESKTOP = 'rac-desktop',
  FLEX_ALIGN_ITEMS_CENTER = 'rac-flex-align-items-center',
  FLEX_ALIGN_ITEMS_END = 'rac-flex-align-items-end',
  FLEX_HALF = 'rac-flex-half',
  FLEX_ONE_QUARTER = 'rac-flex-one-quarter',
  FLEX_ONE_THIRD = 'rac-flex-one-third',
  FLEX_THREE_QUARTERS = 'rac-flex-three-quarters',
  FLEX_X1 = 'rac-flex-x1',
  FLEX_X2 = 'rac-flex-x2',
  FLEX_X3 = 'rac-flex-x3',
  FLEX_X4 = 'rac-flex-x4',
  IOS = 'rac-ios',
  MAC = 'rac-mac',
  MARGIN_LEFT_AUTO = 'rac-margin-left-auto',
  MARGIN_RIGHT_AUTO = 'rac-margin-right-auto',
  MOBILE = 'rac-mobile',
  OVERFLOW_HIDDEN = 'rac-overflow-hidden',
  RAC = 'rac',
  RELATIVE = 'rac-relative',
  SAFARI = 'rac-safari',
}
