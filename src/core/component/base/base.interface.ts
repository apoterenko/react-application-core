import { Component, SyntheticEvent } from 'react';

import {
  AnyT,
  IHtmlElementSelfWrapper,
} from '../../definitions.interface';
import { IComponentPlugin, IComponentPluginCtor } from '../../component/plugin';
import { IUniversalContainerEntity, IComponentEntity } from '../../entities-definitions.interface';
import { IUniversalBaseContainer } from './universal-base.interface';

export type ComponentPluginCtorT = IComponentPluginCtor<IBaseComponent<IBaseComponentInternalProps, {}>,
                                                        IBaseComponentInternalProps,
                                                        {}>;

export interface IBaseContainerInternalState {
}

export interface IBaseComponent<TInternalProps, TInternalState>
    extends Component<TInternalProps, TInternalState>,
            IHtmlElementSelfWrapper {
  stopEvent(event: SyntheticEvent<AnyT>): void;
  registerPlugin(componentPlugin: IComponentPluginCtor<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>):
      IComponentPlugin<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>;
}

export interface IBaseComponentInternalProps extends IComponentEntity {
  plugins?: ComponentPluginCtorT|ComponentPluginCtorT[];
}

export interface IBaseContainer<TInternalProps extends IUniversalContainerEntity,
                                TInternalState>
  extends IUniversalBaseContainer<TInternalProps, TInternalState> {
}

/* @stable - 04.04.2018 */
export interface IDefaultBaseComponent extends IBaseComponent<{}, {}> {
}
