import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IForwardedRefWrapper,
  IStyleWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import { ISettingsEntity } from '../settings/settings.interface';

/**
 * @presets-entity
 * @stable [30.07.2020]
 */
export interface IPresetsRefComponentEntity<TComponent = AnyT>
  extends React.RefAttributes<TComponent>,
    IForwardedRefWrapper<React.RefObject<AnyT>> {
}

/**
 * @presets-entity
 * @stable [12.06.2020]
 */
export interface IPresetsBaseComponentEntity
  extends IClassNameWrapper<string | ((...args: AnyT[]) => string)>,
    IStyleWrapper<React.CSSProperties>,
    ITitleWrapper<string | boolean> {
}

/**
 * @presets-entity
 * @stable [12.06.2020]
 */
export interface IPresetsComponentEntity<TComponent = AnyT>
  extends IPresetsRefComponentEntity<TComponent>,
    IPresetsBaseComponentEntity {
}

/**
 * @generic-entity
 * @stable [27.02.2020]
 */
export interface IGenericBaseComponentEntity<TComponent = AnyT>
  extends IPresetsRefComponentEntity<TComponent> {
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
export interface IGenericBaseComponentProps<TComponent = AnyT>
  extends IGenericBaseComponentEntity<TComponent> {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IGenericComponentProps
  extends IGenericComponentEntity {
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
