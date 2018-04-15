import { Component, SyntheticEvent } from 'react';

import {
  AnyT,
  IStringTitleWrapper,
  IClassNameWrapper,
  ICssStyleWrapper,
  IHtmlElementSelfWrapper,
} from '../../definitions.interface';
import { IComponentPlugin, IComponentPluginCtor } from '../../component/plugin';
import { IUniversalContainerEntity } from '../../entities-definitions.interface';
import { IUniversalBaseContainer } from './universal-base.interface';

export type ComponentPluginCtorT = IComponentPluginCtor<IBaseComponent<IBaseComponentInternalProps, {}>,
                                                        IBaseComponentInternalProps,
                                                        {}>;

export interface IComponentEntity extends IClassNameWrapper,
                                          IStringTitleWrapper {
  emptyDataMessage?: string;
  message?: string;
  errorMessage?: string;
}

export interface IBaseContainerInternalState {
}

export interface IBaseComponent<TInternalProps, TInternalState>
    extends Component<TInternalProps, TInternalState>,
            IHtmlElementSelfWrapper {
  stopEvent(event: SyntheticEvent<AnyT>): void;
  registerPlugin(componentPlugin: IComponentPluginCtor<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>):
      IComponentPlugin<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>;
}

export interface IBaseComponentInternalProps extends IComponentEntity,
                                                     ICssStyleWrapper {
  plugins?: ComponentPluginCtorT|ComponentPluginCtorT[];
}

export interface IBaseContainer<TInternalProps extends IUniversalContainerEntity,
                                TInternalState>
  extends IUniversalBaseContainer<TInternalProps, TInternalState> {
}

/* @stable - 04.04.2018 */
export interface IDefaultBaseComponent extends IBaseComponent<{}, {}> {
}

export interface IBaseComponentCtor { new (...args): IDefaultBaseComponent; }
