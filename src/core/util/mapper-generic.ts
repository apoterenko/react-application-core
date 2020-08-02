import {
  IReduxBaseSelectEntity,
  IReduxDictionaryEntity,
} from '../definition';
import { MapAsWrapperUtils } from './map-as-wrapper';
import { WrapperUtils } from './wrapper';
import { MapAsUtils } from './map-as';

/**
 * @stable [19.05.2020]
 * @param {IReduxDictionaryEntity<TEntity>} entity
 * @param {(data: TEntity[]) => TResult} accessor
 * @returns {IReduxBaseSelectEntity}
 */
const mapDictionaryEntityAsSelectEntity =
  <TEntity, TResult = TEntity[]>(entity: IReduxDictionaryEntity<TEntity>,
                                 accessor?: (data: TEntity[]) => TResult): IReduxBaseSelectEntity =>
    ({
      ...MapAsWrapperUtils.waitingForOptions(WrapperUtils.isLoading(entity)),
      ...MapAsWrapperUtils.options(MapAsUtils.dictionaryEntityAsSelectOptionEntities<TEntity>(entity, accessor)),
    });

/**
 * @stable [06.05.2020]
 */
export class GenericMappers {
  public static readonly dictionaryEntityAsSelectEntity = mapDictionaryEntityAsSelectEntity;                                                      /* stable [19.05.2020] */
}
