import { IRouteEntity } from './router-definition.interface';
import {
  IAccessConfigurationWrapper,
  IInjectedServicesWrapper,
  IKeyValue,
  IMappersWrapper,
  IRouteConfigurationWrapper,
} from '../definitions.interface';
import { INamedConstructor } from './constructor-definition.interface';

/**
 * @stable [16.11.2019]
 */
export type ConnectorMapperT<TStoreEntity> = (state: TStoreEntity) => IKeyValue;

/**
 * @stable [16.11.2019]
 */
export interface IBasicConnectorEntity<TStoreEntity>
  extends IInjectedServicesWrapper<INamedConstructor[]>,
    IMappersWrapper<Array<ConnectorMapperT<TStoreEntity>>>,
    IRouteConfigurationWrapper<IRouteEntity> {
}

/**
 * @stable [16.11.2019]
 */
export interface IConnectorEntity<TStoreEntity = {}, TAccessConfig = {}>
  extends IBasicConnectorEntity<TStoreEntity>,
    IAccessConfigurationWrapper<TAccessConfig> {
}
