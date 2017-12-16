import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { IApplicationTransport } from './transport.interface';
import { IEntity } from '../definition.interface';
import { IApiEntityRequest } from '../api';

@provideInSingleton(BaseTransport)
export class BaseTransport {
  @lazyInject(DI_TYPES.Transport) protected transport: IApplicationTransport;

  protected doSaveEntity<TEntity extends IEntity>(
      entityRequest: IApiEntityRequest<TEntity>): Promise<TEntity> {
    const apiEntity = entityRequest.apiEntity;
    return this.transport.request<TEntity>({
      params: {
        ...apiEntity.changes || {},
        ...entityRequest.extraParams,
        ...!apiEntity.isNew ? { id: apiEntity.id } : {},
      },
      name: apiEntity.isNew ? entityRequest.addApi : entityRequest.editApi,
      operation: apiEntity.operation,
    });
  }
}
