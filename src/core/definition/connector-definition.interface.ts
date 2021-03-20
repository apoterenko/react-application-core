import { IRouteEntity } from './router-definition.interface';
import {
  ACTION_PREFIX,
  IAccessConfigurationWrapper,
  IAutoScrollToInitPositionWrapper,
  IErrorWrapper,
  IKeyValue,
  IMappersWrapper,
  IRouteConfigurationWrapper,
} from '../definitions.interface';
import { IGenericContainerCtor } from './generic-container-definition.interface';
import { IReduxStoreEntity } from './redux-definition.interface';

/**
 * @stable [16.11.2019]
 */
export type ConnectorMapperT<TStoreEntity> = (state: TStoreEntity) => IKeyValue;

/**
 * @stable [17.11.2019]
 */
export type DynamicSectionsMapT = Map<string, IConnectorEntity>;

/**
 * @configuration-entity
 * @stable [11.04.2020]
 */
export interface IRouteConfigurationEntity
  extends IRouteConfigurationWrapper<IRouteEntity> {
}

/**
 * @stable [16.11.2019]
 */
export interface IBasicConnectorEntity<TStoreEntity = IReduxStoreEntity>
  extends IMappersWrapper<ConnectorMapperT<TStoreEntity>[]>,
    IRouteConfigurationEntity,
    IAutoScrollToInitPositionWrapper {
}

/**
 * @stable [16.11.2019]
 */
export interface IConnectorEntity<TStoreEntity = {}, TAccessConfig = {}>
  extends IBasicConnectorEntity<TStoreEntity>,
    IAccessConfigurationWrapper<TAccessConfig> {
}

/**
 * @stable [11.06.2020]
 */
export interface IConnectorContainerFactory {
  fromTarget<TStoreEntity extends IReduxStoreEntity = IReduxStoreEntity>(
    target: IGenericContainerCtor,
    section: string,
    config: IBasicConnectorEntity<TStoreEntity>
  ): IGenericContainerCtor;
}

/**
 * @state
 * @stable [19.09.2020]
 */
export interface IGenericConnectorContainerState
  extends IErrorWrapper<Error> {
}

/**
 * @stable [19.09.2020]
 */
export const $RAC_CONNECTED_CONTAINER_DESTROY_ACTION_TYPE = `${ACTION_PREFIX}connected.container.destroy`;
export const $RAC_CONNECTED_CONTAINER_INIT_ACTION_TYPE = `${ACTION_PREFIX}connected.container.init`;
