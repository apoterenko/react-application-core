import { IGenericStoreEntity } from './redux-definition.interface';
import { IGenericBaseComponentProps } from './generic-component-definition.interface';
import {
  IDialogFormChangesConfirmStoreProxy,
  IDictionaryStoreProxy,
  IFormStoreProxy,
  INotificationStoreProxy,
  IRouterStoreProxy,
  IStoreProxy,
} from './store-proxy-definition.interface';
import { IPropsWrapper } from '../definitions.interface';

/**
 * @generic-entity
 * @stable [30.03.2020]
 */
export interface IGenericContainerEntity<TDictionaries = {}>
  extends IGenericStoreEntity<TDictionaries> {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IGenericContainerProps<TDictionaries = {}>
  extends IGenericBaseComponentProps,
    IGenericContainerEntity<TDictionaries> {
}

/**
 * @container
 * @stable [30.03.2020]
 */
export interface IGenericContainer<TProps extends IGenericContainerProps<TDictionaries> = IGenericContainerProps<TDictionaries>,
  TDictionaries = {}>
  extends IPropsWrapper<TProps>,
    IStoreProxy {
  dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;
  dictionaryStoreProxy: IDictionaryStoreProxy;
  formStoreProxy: IFormStoreProxy;
  notificationStoreProxy: INotificationStoreProxy;
  routerStoreProxy: IRouterStoreProxy;
}
