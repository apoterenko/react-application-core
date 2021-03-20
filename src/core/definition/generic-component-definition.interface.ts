import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IForwardedRefWrapper,
  INoMergedPropsWrapper,
  IStyleWrapper,
  ITitleWrapper,
  StringFnT,
} from '../definitions.interface';
import { ISettingsEntity } from '../settings/settings.interface';

/**
 * @presets-entity
 * @stable [24.05.2020]
 */
export interface IPresetsComponentEntity<TComponent = AnyT>
  extends React.RefAttributes<TComponent>,
    IClassNameWrapper<StringFnT>,
    IForwardedRefWrapper<React.RefObject<AnyT>>,
    INoMergedPropsWrapper,
    IStyleWrapper<React.CSSProperties>,
    ITitleWrapper<string | boolean> {
}

/**
 * @generic-entity
 * @stable [27.02.2020]
 */
export interface IGenericComponentEntity<TComponent = AnyT>
  extends IPresetsComponentEntity<TComponent> {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IGenericComponentProps<TComponent = AnyT>
  extends IGenericComponentEntity<TComponent> {
}

/**
 * @component
 * @stable [30.03.2020]
 */
export interface IGenericComponent<TProps extends IGenericComponentProps = IGenericComponentProps,
                                   TState = {},
                                   TSelfRef = AnyT>
  extends React.PureComponent<TProps, TState>,
    React.Component<TProps, TState> {
  actualRef: React.RefObject<TSelfRef>;
  originalProps: TProps;
  selfRef: React.RefObject<TSelfRef>;
  settings: ISettingsEntity;
}

/**
 * @ctor
 * @stable [10.04.2020]
 */
export interface IGenericComponentCtor<TProps extends IGenericComponentProps = IGenericComponentProps, TState = {}>
  extends React.ComponentClass<TProps, TState> {
}
