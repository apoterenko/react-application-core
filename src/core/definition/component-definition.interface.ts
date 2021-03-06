import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IGetSelfWrapper,
  IPluginsWrapper,
  IStyleWrapper,
} from '../definitions.interface';
import { GenericPluginCtorT } from './plugin-definition.interface';
import {
  IComponentProps,
  IUniversalComponentProps,
} from './props-definition.interface';
import { IGenericComponentEntity } from './generic-component-definition.interface';

/**
 * TODO
 * @deprecated
 */
export interface IWebComponentEntity
  extends IClassNameWrapper<any>,
    IStyleWrapper<React.CSSProperties> {
}

/**
 * @deprecated
 */
export interface IUniversalComponentEntity
  extends IGenericComponentEntity<AnyT>,
    IPluginsWrapper<GenericPluginCtorT | GenericPluginCtorT[]> {
}

/**
 * TODO
 * @deprecated
 */
export interface IUniversalComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps, TState = {}>
  extends React.Component<TProps, TState>,
    IGetSelfWrapper {
}

/**
 * TODO
 * @deprecated
 */
export interface IComponent<TProps extends IComponentProps = IComponentProps,
  TState = {}>
  extends IUniversalComponent<TProps, TState> {
}

/**
 * TODO
 * @deprecated
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
  BREAK_WORD = 'rac-break-word',
  CALENDAR_DIALOG_RANGE_INPUT_SEPARATOR = 'rac-calendar-dialog__range-input-separator',   // TODO
  CHROME = 'rac-chrome',
  DESKTOP = 'rac-desktop',
  DISPLAY_NONE = 'rac-display-none',
  FIXED = 'rac-fixed',
  FLEX_0_40 = 'rac-flex-0-40',
  FLEX_0_50 = 'rac-flex-0-50',
  FLEX_0_60 = 'rac-flex-0-60',
  FLEX_ALIGN_ITEMS_CENTER = 'rac-flex-align-items-center',
  FLEX_ALIGN_ITEMS_END = 'rac-flex-align-items-end',
  FLEX_BASIS_1 = 'rac-flex-basis-1',
  FLEX_HALF = 'rac-flex-half',
  FLEX_JUSTIFY_CONTENT_CENTER = 'rac-flex-justify-content-center',
  FLEX_ONE_QUARTER = 'rac-flex-one-quarter',
  FLEX_ONE_THIRD = 'rac-flex-one-third',
  FLEX_THREE_QUARTERS = 'rac-flex-three-quarters',
  FLEX_X1 = 'rac-flex-x1',
  FLEX_X2 = 'rac-flex-x2',
  FLEX_X3 = 'rac-flex-x3',
  FLEX_X4 = 'rac-flex-x4',
  FULL_SIZE = 'rac-full-size',
  INVISIBLE = 'rac-invisible',
  IOS = 'rac-ios',
  MAC = 'rac-mac',
  MARGIN_LEFT_AUTO = 'rac-margin-left-auto',
  MARGIN_RIGHT_AUTO = 'rac-margin-right-auto',
  MOBILE = 'rac-mobile',
  NOWRAP = 'rac-nowrap',
  OVERFLOW_HIDDEN = 'rac-overflow-hidden',
  PS = 'ps',
  RAC = 'rac',
  RELATIVE = 'rac-relative',
  SAFARI = 'rac-safari',
  STRONG = 'rac-strong',
  TRANSPARENT = 'rac-transparent',
  VISIBILITY_HIDDEN = 'rac-visibility-hidden',
}
