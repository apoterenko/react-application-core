import * as R from 'ramda';

import {
  IDisabledWrapper,
  IEntity,
  IFormWrapper,
  ILayoutWrapper,
  IListWrapper,
  IProgressWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
  ISectionNameWrapper,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { defValuesFilter } from './filter';
import {
  ifNotNilThanValue,
  orUndef,
} from './cond';
import {
  IExtendedEntity,
  IExtendedFormEntity,
  IFormEntity,
  ILayoutEntity,
  IListEntity,
  IQueryFilterEntity,
  IReduxActiveQueryEntity,
  IReduxFormEntity,
  IReduxLifeCycleEntity,
  IReduxPagedEntity,
  IReduxPaginatedEntity,
  IReduxPaginatedLifeCycleEntity,
} from '../definition';
import { Selectors } from './select';
import { inProgress } from './wrapper';
import { isNewEntity } from './entity';
import { nvl } from './nvl';

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {TValue} layout
 * @returns {ILayoutWrapper<TValue>}
 */
const mapLayout = <TValue>(layout: TValue): ILayoutWrapper<TValue> =>
  defValuesFilter<ILayoutWrapper<TValue>, ILayoutWrapper<TValue>>({layout});

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {TForm} form
 * @returns {IFormWrapper<TForm>}
 */
const mapForm = <TForm>(form: TForm): IFormWrapper<TForm> =>
  defValuesFilter<IFormWrapper<TForm>, IFormWrapper<TForm>>({form});

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {boolean} disabled
 * @returns {IDisabledWrapper}
 */
const mapDisabled = (disabled: boolean): IDisabledWrapper =>
  defValuesFilter<IDisabledWrapper, IDisabledWrapper>({disabled});

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IProgressWrapper} entity
 * @returns {IDisabledWrapper}
 */
const mapProgressAsDisabled = (entity: IProgressWrapper): IDisabledWrapper => mapDisabled(inProgress(entity));

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {string} sectionName
 * @returns {ISectionNameWrapper}
 */
const mapSectionName = (sectionName: string): ISectionNameWrapper =>
  defValuesFilter<ISectionNameWrapper, ISectionNameWrapper>({sectionName});

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {ISectionNameWrapper} wrapper
 * @returns {ISectionNameWrapper}
 */
const mapSectionNameWrapper = (wrapper: ISectionNameWrapper): ISectionNameWrapper =>
  mapSectionName(Selectors.sectionName(wrapper));

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {TList} list
 * @returns {IListWrapper<TList>}
 */
const mapList = <TList>(list: TList): IListWrapper<TList> =>
  defValuesFilter<IListWrapper<TList>, IListWrapper<TList>>({list});

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IListEntity} entity
 * @returns {IListEntity}
 */
const mapListEntity = (entity: IListEntity): IListEntity => mapList(Selectors.list(entity));

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IListEntity} listEntity
 * @returns {IDisabledWrapper}
 */
const mapListEntityAsDisabled = (listEntity: IListEntity): IDisabledWrapper =>
  mapProgressAsDisabled(Selectors.list(listEntity));

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {TEntity} queryFilter
 * @returns {IQueryFilterWrapper<TEntity>}
 */
const mapQueryFilter = <TEntity = string>(queryFilter: TEntity): IQueryFilterWrapper<TEntity> =>
  defValuesFilter<IQueryFilterWrapper<TEntity>, IQueryFilterWrapper<TEntity>>({queryFilter});

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {string} query
 * @returns {IQueryWrapper}
 */
const mapQuery = (query: string): IQueryWrapper => defValuesFilter<IQueryWrapper, IQueryWrapper>({query});

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IQueryFilterEntity} entity
 * @returns {IQueryFilterEntity}
 */
const mapQueryFilterEntity = (entity: IQueryFilterEntity): IQueryFilterEntity =>
  mapQueryFilter(Selectors.queryFilter(entity));

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IFormEntity<TEntity>} entity
 * @returns {IFormEntity<TEntity>}
 */
const mapFormEntity = <TEntity = IEntity>(entity: IFormEntity<TEntity>): IFormEntity<TEntity> =>
  mapForm(Selectors.form(entity));

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IQueryFilterEntity} entity
 * @returns {IQueryWrapper}
 */
const mapQueryFilterEntityAsQuery = (entity: IQueryFilterEntity): IQueryWrapper =>
  mapQuery(Selectors.queryFilterEntityQuery(entity));

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IReduxPagedEntity} entity
 * @returns {IReduxPagedEntity}
 */
const mapPagedEntity = (entity: IReduxPagedEntity): IReduxPagedEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IReduxPagedEntity, IReduxPagedEntity>({
    page: entity.page,
    pageSize: entity.pageSize,
  }),
  UNDEF_SYMBOL
);

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IExtendedEntity<TEntity>} extendedEntity
 * @returns {IExtendedEntity<TEntity>}
 */
const mapExtendedEntity =
  <TEntity = IEntity>(extendedEntity: IExtendedEntity<TEntity>): IExtendedEntity<TEntity> =>
    defValuesFilter<IExtendedEntity<TEntity>, IExtendedEntity<TEntity>>({
      changes: extendedEntity.changes,
      entity: extendedEntity.entity,
      entityId: extendedEntity.entityId,
      newEntity: extendedEntity.newEntity,
      originalEntity: extendedEntity.originalEntity,
    });

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IReduxFormEntity<TEntity extends IEntity>} formEntity
 * @param {TEntity} entity
 * @returns {IExtendedEntity<TEntity extends IEntity>}
 */
const mapEntityAsExtendedEntity =
  <TEntity extends IEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                      entity?: TEntity): IExtendedEntity<TEntity> => {
    const newEntity = isNewEntity(entity);
    const {
      changes,
      defaultChanges,
    } = formEntity;
    let originalEntity;

    if (!R.isNil(nvl(defaultChanges, entity))) {
      originalEntity = {...defaultChanges as {}, ...entity as {}};
    }

    return mapExtendedEntity({
      changes,
      entity: {...originalEntity as {}, ...changes as {}},
      entityId: orUndef(!newEntity, () => entity.id),
      newEntity,
      originalEntity,
    });
  };

/**
 * @mapper
 * @stable [09.05.2020]
 * @param {IReduxFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {IExtendedFormEntity<TEntity>}
 */
const mapFormEntityAsExtendedEntity = <TEntity  = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                                           entity?: TEntity): IExtendedFormEntity<TEntity> =>
  ({
    ...GenericMappers.form(formEntity),
    ...GenericMappers.entityAsExtendedEntity(formEntity, entity),
  });

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IReduxActiveQueryEntity} entity
 * @returns {IReduxActiveQueryEntity}
 */
const mapActiveQueryEntity = (entity: IReduxActiveQueryEntity): IReduxActiveQueryEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IReduxActiveQueryEntity, IReduxActiveQueryEntity>({
    active: entity.active,
    query: entity.query,
  }),
  UNDEF_SYMBOL
);

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IReduxLifeCycleEntity} entity
 * @returns {IReduxLifeCycleEntity}
 */
const mapLifeCycleEntity = (entity: IReduxLifeCycleEntity): IReduxLifeCycleEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IReduxLifeCycleEntity, IReduxLifeCycleEntity>({
    error: entity.error,
    progress: entity.progress,
    touched: entity.touched,
  }),
  UNDEF_SYMBOL
);

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {IReduxPaginatedEntity}
 */
const mapPaginatedEntity = (entity: IReduxPaginatedEntity): IReduxPaginatedEntity =>
  ifNotNilThanValue(
    entity,
    () => defValuesFilter<IReduxPaginatedEntity, IReduxPaginatedEntity>({
      ...mapPagedEntity(entity),
      lockPage: entity.lockPage,
      totalAmount: entity.totalAmount,
      totalCount: entity.totalCount,
    }),
    UNDEF_SYMBOL
  );

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IReduxPaginatedLifeCycleEntity} entity
 * @returns {IReduxPaginatedLifeCycleEntity}
 */
const mapPaginatedLifeCycleEntity = (entity: IReduxPaginatedLifeCycleEntity): IReduxPaginatedLifeCycleEntity => ({
  ...mapLifeCycleEntity(entity),
  ...mapPaginatedEntity(entity),
});

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {ILayoutEntity} wrapper
 * @returns {ILayoutEntity}
 */
const mapLayoutEntity = (wrapper: ILayoutEntity): ILayoutEntity => mapLayout(Selectors.layout(wrapper));

/**
 * @stable [06.05.2020]
 */
export class GenericMappers {
  public static activeQueryEntity = mapActiveQueryEntity;                                                 /* stable [07.05.2020] */
  public static disabled = mapDisabled;                                                                   /* stable [07.05.2020] */
  public static entityAsExtendedEntity = mapEntityAsExtendedEntity;                                       /* stable [08.05.2020] */
  public static extendedEntity = mapExtendedEntity;                                                       /* stable [08.05.2020] */
  public static form = mapForm;                                                                           /* stable [08.05.2020] */
  public static formEntity = mapFormEntity;                                                               /* stable [08.05.2020] */
  public static formEntityAsExtendedEntity = mapFormEntityAsExtendedEntity;                               /* stable [09.05.2020] */
  public static layoutEntity = mapLayoutEntity;                                                           /* stable [08.05.2020] */
  public static lifeCycleEntity = mapLifeCycleEntity;                                                     /* stable [08.05.2020] */
  public static listEntity = mapListEntity;                                                               /* stable [07.05.2020] */
  public static listEntityAsDisabled = mapListEntityAsDisabled;                                           /* stable [08.05.2020] */
  public static pagedEntity = mapPagedEntity;                                                             /* stable [07.05.2020] */
  public static paginatedEntity = mapPaginatedEntity;                                                     /* stable [07.05.2020] */
  public static paginatedLifeCycleEntity = mapPaginatedLifeCycleEntity;                                   /* stable [07.05.2020] */
  public static progressAsDisabled = mapProgressAsDisabled;                                               /* stable [08.05.2020] */
  public static query = mapQuery;                                                                         /* stable [08.05.2020] */
  public static queryFilter = mapQueryFilter;                                                             /* stable [08.05.2020] */
  public static queryFilterEntity = mapQueryFilterEntity;                                                 /* stable [07.05.2020] */
  public static queryFilterEntityAsQuery = mapQueryFilterEntityAsQuery;                                   /* stable [07.05.2020] */
  public static sectionName = mapSectionName;                                                             /* stable [08.05.2020] */
  public static sectionNameWrapper = mapSectionNameWrapper;                                               /* stable [08.05.2020] */
}
