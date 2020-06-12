import * as React from 'react';
import { Store } from 'redux';

import {
  DI_TYPES,
  getAuth,
  getDynamicRoutes,
  getPermissionsManager,
  getStore,
  staticInjector,
} from '../../di';
import { IKeyValue } from '../../definitions.interface';
import {
  DynamicRoutesT,
  IAuth,
  IPermissionsManager,
  IRoutesEntity,
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../definition';
import {
  applySection,
} from '../../util';
import { GenericBaseComponent } from './generic-base.component';

/**
 * TODO
 * @deprecated
 */
export class UniversalContainer<TProps extends IUniversalContainerProps = IUniversalContainerProps,
                                TState = {},
                                TAccessConfig = {}>
  extends GenericBaseComponent<TProps, TState>
  implements IUniversalContainer<TProps, TState> {

  /**
   * @stable [27.10.2019]
   * @param {string} type
   * @param {TData} data
   */
  public dispatchCustomType<TData = IKeyValue>(type: string, data?: TData): void {
    this.appStore.dispatch({type, data});
  }

  /**
   * @stable [27.10.2019]
   * @param {string} type
   * @param {TData} data
   * @param {string} otherSectionName
   */
  public dispatch<TData = IKeyValue>(type: string, data?: TData, otherSectionName?: string): void {
    const {sectionName} = this.props;
    const finalSectionName = otherSectionName || sectionName;
    this.dispatchCustomType(`${finalSectionName}.${type}`, applySection(finalSectionName, data));
  }

  /**
   * @stable [16.11.2019]
   * @param {TAccessConfig} checkedObject
   * @returns {boolean}
   */
  protected hasPermission(checkedObject: TAccessConfig): boolean {
    return this.permissionsManager.isAccessible(checkedObject);
  }

  /**
   * @stable - 15.04.2018
   * @returns {IRoutesEntity}
   */
  protected get routes(): IRoutesEntity {
    return staticInjector(DI_TYPES.Routes);
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {Store<IUniversalStoreEntity>}
   */
  protected get appStore(): Store<IUniversalStoreEntity> {
    return getStore();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {IPermissionsManager<TAccessConfig>}
   */
  protected get permissionsManager(): IPermissionsManager<TAccessConfig> {
    return getPermissionsManager<TAccessConfig>();
  }

  /**
   * @react-native-compatible
   * @stable [16.11.2019]
   * @returns {IAuth}
   */
  protected get auth(): IAuth {
    return getAuth();
  }

  /**
   * @react-native-compatible
   * @stable [16.11.2019]
   * @returns {DynamicRoutesT}
   */
  protected get dynamicRoutes(): DynamicRoutesT {
    return getDynamicRoutes();
  }
}
