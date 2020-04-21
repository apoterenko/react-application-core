import * as React from 'react';

import {
  AnyT,
  IClassNameWrapper,
  IStyleWrapper,
  ITitleWrapper,
} from '../definitions.interface';

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
 * @component
 * @stable [30.03.2020]
 */
export interface IGenericComponent<TProps extends IGenericComponentProps = IGenericComponentProps,
                                   TState = {},
                                   TSelfRef = AnyT>
  extends React.PureComponent<TProps, TState> {
  selfRef: React.RefObject<TSelfRef>;
}

/**
 * @ctor
 * @stable [10.04.2020]
 */
export interface IGenericComponentCtor<TProps extends IGenericComponentProps = IGenericComponentProps, TState = {}>
  extends React.ComponentClass<TProps, TState> {
}
