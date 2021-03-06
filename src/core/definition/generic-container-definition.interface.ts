import * as React from 'react';
import { IEffectsAction } from 'redux-effects-promise';

import { IReduxStoreEntity } from './redux-definition.interface';
import {
  IDialogFormChangesConfirmStoreProxy,
  IDictionaryStoreProxy,
  IFormStoreProxy,
  IListStoreProxy,
  INotificationStoreProxy,
  IRouterStoreProxy,
  IStoreProxy,
  ITabPanelStoreProxy,
} from './store-proxy-definition.interface';
import {
  AnyT,
  IDispatchWrapper,
  IFullscreenEnabledWrapper,
  ISectionNameWrapper,
} from '../definitions.interface';
import {
  IGenericComponent,
  IGenericComponentProps,
} from './generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [12.06.2020]
 */
export interface IPresetsContainerEntity
  extends IDispatchWrapper<IEffectsAction>,
    ISectionNameWrapper {
}

/**
 * @generic-entity
 * @stable [30.03.2020]
 */
export interface IGenericContainerEntity<TDictionaries = {}>
  extends IReduxStoreEntity<TDictionaries>,
    IPresetsContainerEntity {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IGenericContainerProps<TDictionaries = {}, TComponent = AnyT>
  extends IGenericComponentProps<TComponent>,
    IGenericContainerEntity<TDictionaries> {
}

/**
 * @state
 * @stable [21.03.2021]
 */
export interface IGenericContainerState
  extends IFullscreenEnabledWrapper {
}

/**
 * @container
 * @stable [30.03.2020]
 */
export interface IGenericContainer<
    // @ts-ignore
    TProps extends IGenericContainerProps<TDictionaries> = IGenericContainerProps<TDictionaries>,
    TDictionaries = {}
  >
  extends IGenericComponent<TProps>,
    IStoreProxy {
  dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;
  dictionaryStoreProxy: IDictionaryStoreProxy;
  formStoreProxy: IFormStoreProxy;
  listStoreProxy: IListStoreProxy;
  notificationStoreProxy: INotificationStoreProxy;
  routerStoreProxy: IRouterStoreProxy;
  tabPanelStoreProxy: ITabPanelStoreProxy;
}

/**
 * @ctor
 * @stable [08.06.2020]
 */
export interface IGenericContainerCtor<TProps extends IGenericContainerProps = IGenericContainerProps, TState = {}>
  extends React.ComponentClass<TProps, TState> {
}
