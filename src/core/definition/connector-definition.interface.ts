import { IRouteEntity } from './router-definition.interface';
import {
  ACTION_PREFIX,
  IAccessConfigurationWrapper,
  IKeyValue,
  IMappersWrapper,
  IRouteConfigurationWrapper,
} from '../definitions.interface';
import { IUniversalContainerCtor } from './container-definition.interface';

/**
 * @stable [16.11.2019]
 */
export type ConnectorMapperT<TStoreEntity> = (state: TStoreEntity) => IKeyValue;

/**
 * @stable [17.11.2019]
 */
export type DynamicSectionsMapT = Map<string, IConnectorEntity>;

/**
 * @stable [16.11.2019]
 */
export interface IBasicConnectorEntity<TStoreEntity>
  extends IMappersWrapper<Array<ConnectorMapperT<TStoreEntity>>>,
    IRouteConfigurationWrapper<IRouteEntity> {
}

/**
 * @stable [16.11.2019]
 */
export interface IConnectorEntity<TStoreEntity = {}, TAccessConfig = {}>
  extends IBasicConnectorEntity<TStoreEntity>,
    IAccessConfigurationWrapper<TAccessConfig> {
}

/**
 * @stable [19.12.2019]
 */
export interface IUniversalConnectorContainerFactory {
  fromTarget(target: IUniversalContainerCtor, section: string): IUniversalContainerCtor;
}

/**
 * @stable [25.11.2019]
 */
export const $RAC_CONNECTED_CONTAINER_DESTROY_ACTION_TYPE = `${ACTION_PREFIX}connected.container.destroy`;
export const $RAC_CONNECTED_CONTAINER_INIT_ACTION_TYPE = `${ACTION_PREFIX}connected.container.init`;
