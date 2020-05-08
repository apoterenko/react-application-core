import {
  IDisabledWrapper,
  IEntity,
  IFormWrapper,
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
  IFormEditableEntity,
  IGenericActiveQueryEntity,
  IGenericEditableEntity,
  IGenericLifeCycleEntity,
  IGenericPagedEntity,
  IGenericPaginatedEntity,
  IGenericPaginatedLifeCycleEntity,
  IListWrapperEntity,
  IQueryFilterEntity,
} from '../definition';
import { Selectors } from './select';
import { inProgress } from './wrapper';
import { isNewEntity } from './entity';
import { nvl } from './nvl';

/**
 * @stable [08.05.2020]
 * @param {TForm} form
 * @returns {IFormWrapper<TForm>}
 */
const mapForm = <TForm>(form: TForm): IFormWrapper<TForm> =>
  defValuesFilter<IFormWrapper<TForm>, IFormWrapper<TForm>>({form});

/**
 * @stable [08.05.2020]
 * @param {boolean} disabled
 * @returns {IDisabledWrapper}
 */
const mapDisabled = (disabled: boolean): IDisabledWrapper =>
  defValuesFilter<IDisabledWrapper, IDisabledWrapper>({disabled});

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {IProgressWrapper} entity
 * @returns {IDisabledWrapper}
 */
const mapProgressWrapperAsDisabledWrapper = (entity: IProgressWrapper): IDisabledWrapper =>
  mapDisabled(inProgress(entity));

/**
 * @stable [07.05.2020]
 * @mapper-generic
 *
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {IDisabledWrapper}
 */
const mapListWrapperEntityAsDisabledWrapper = (listWrapperEntity: IListWrapperEntity): IDisabledWrapper =>
  mapProgressWrapperAsDisabledWrapper(Selectors.list(listWrapperEntity));

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {string} sectionName
 * @returns {ISectionNameWrapper}
 */
const mapSectionName = (sectionName: string): ISectionNameWrapper =>
  defValuesFilter<ISectionNameWrapper, ISectionNameWrapper>({sectionName});

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {TList} list
 * @returns {IListWrapper<TList>}
 */
const mapList = <TList>(list: TList): IListWrapper<TList> =>
  defValuesFilter<IListWrapper<TList>, IListWrapper<TList>>({list});

/**
 * @stable [07.05.2020]
 * @mapper-generic
 *
 * @param {TEntity} queryFilter
 * @returns {IQueryFilterWrapper<TEntity>}
 */
const mapQueryFilter = <TEntity = string>(queryFilter: TEntity): IQueryFilterWrapper<TEntity> =>
  defValuesFilter<IQueryFilterWrapper<TEntity>, IQueryFilterWrapper<TEntity>>({queryFilter});

/**
 * @stable [06.05.2020]
 * @param {string} query
 * @returns {IQueryWrapper}
 */
const mapQuery = (query: string): IQueryWrapper => defValuesFilter<IQueryWrapper, IQueryWrapper>({query});

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {ISectionNameWrapper} wrapper
 * @returns {ISectionNameWrapper}
 */
const mapSectionNameWrapper = (wrapper: ISectionNameWrapper): ISectionNameWrapper =>
  mapSectionName(Selectors.sectionName(wrapper));

/**
 * @stable [08.05.2020]
 * @param {IListWrapperEntity} wrapper
 * @returns {IListWrapperEntity}
 */
const mapListWrapperEntity = (wrapper: IListWrapperEntity): IListWrapperEntity =>
  mapList(Selectors.list(wrapper));

/**
 * @stable [08.05.2020]
 * @param {IQueryFilterEntity} entity
 * @returns {IQueryFilterEntity}
 */
const mapQueryFilterEntity = (entity: IQueryFilterEntity): IQueryFilterEntity =>
  mapQueryFilter(Selectors.queryFilter(entity));

/**
 * @stable [08.05.2020]
 * @param {IFormEditableEntity<TEntity>} wrapper
 * @returns {IFormEditableEntity<TEntity>}
 */
const mapFormEditableEntity = <TEntity = IEntity>(wrapper: IFormEditableEntity<TEntity>): IFormEditableEntity<TEntity> =>
  mapForm(Selectors.form(wrapper));

/**
 * @stable [08.05.2020]
 * @param {IQueryFilterEntity} entity
 * @returns {IQueryWrapper}
 */
const mapQueryFilterEntityAsQuery = (entity: IQueryFilterEntity): IQueryWrapper =>
  mapQuery(Selectors.queryFilterEntityQuery(entity));

/**
 * @stable [08.05.2020]
 * @param {IGenericPagedEntity} entity
 * @returns {IGenericPagedEntity}
 */
const mapPagedEntity = (entity: IGenericPagedEntity): IGenericPagedEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IGenericPagedEntity, IGenericPagedEntity>({
    page: entity.page,
    pageSize: entity.pageSize,
  }),
  UNDEF_SYMBOL
);

/**
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
 * @stable [08.05.2020]
 * @mapper-generic
 *
 * @param {TEntity} entity
 * @param {IGenericEditableEntity<TEntity extends IEntity>} editableEntity
 * @returns {IExtendedEntity<TEntity extends IEntity>}
 */
const mapEnhancedExtendedEntity =
  <TEntity extends IEntity = IEntity>(entity: TEntity,
                                      editableEntity: IGenericEditableEntity<TEntity>): IExtendedEntity<TEntity> => {
    let originalEntity;
    const newEntity = isNewEntity(entity);
    const changes = editableEntity.changes || {} as TEntity;
    const defaultChanges = editableEntity.defaultChanges;

    ifNotNilThanValue(
      nvl(defaultChanges, entity),
      () => (originalEntity = {...defaultChanges as {}, ...entity as {}} as TEntity)
    );

    return mapExtendedEntity({
      changes,
      entity: {...originalEntity as {}, ...changes as {}} as TEntity,
      entityId: orUndef(!newEntity, () => entity.id),
      newEntity,
      originalEntity,
    });
  };

/**
 * @stable [08.05.2020]
 * @param {IGenericActiveQueryEntity} entity
 * @returns {IGenericActiveQueryEntity}
 */
const mapActiveQueryEntity = (entity: IGenericActiveQueryEntity): IGenericActiveQueryEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IGenericActiveQueryEntity, IGenericActiveQueryEntity>({
    active: entity.active,
    disabled: entity.disabled,
    query: entity.query,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [08.05.2020]
 * @param {IGenericLifeCycleEntity} entity
 * @returns {IGenericLifeCycleEntity}
 */
const mapLifeCycleEntity = (entity: IGenericLifeCycleEntity): IGenericLifeCycleEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IGenericLifeCycleEntity, IGenericLifeCycleEntity>({
    error: entity.error,
    progress: entity.progress,
    touched: entity.touched,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [08.05.2020]
 * @param {IGenericPaginatedEntity} entity
 * @returns {IGenericPaginatedEntity}
 */
const mapPaginatedEntity = (entity: IGenericPaginatedEntity): IGenericPaginatedEntity =>
  ifNotNilThanValue(
    entity,
    () => defValuesFilter<IGenericPaginatedEntity, IGenericPaginatedEntity>({
      ...mapPagedEntity(entity),
      lockPage: entity.lockPage,
      totalAmount: entity.totalAmount,
      totalCount: entity.totalCount,
    }),
    UNDEF_SYMBOL
  );

/**
 * @stable [08.05.2020]
 * @param {IGenericPaginatedLifeCycleEntity} entity
 * @returns {IGenericPaginatedLifeCycleEntity}
 */
const mapPaginatedLifeCycleEntity = (entity: IGenericPaginatedLifeCycleEntity): IGenericPaginatedLifeCycleEntity => ({
  ...mapLifeCycleEntity(entity),
  ...mapPaginatedEntity(entity),
});

/**
 * @stable [06.05.2020]
 */
export class GenericMappers {
  public static activeQueryEntity = mapActiveQueryEntity;                                                 /* stable [07.05.2020] */
  public static disabled = mapDisabled;                                                                   /* stable [07.05.2020] */
  public static enhancedExtendedEntity = mapEnhancedExtendedEntity;                                     /* stable [08.05.2020] */
  public static extendedEntity = mapExtendedEntity;                                                       /* stable [08.05.2020] */
  public static form = mapForm;                                                                           /* stable [08.05.2020] */
  public static formEditableEntity = mapFormEditableEntity;                                               /* stable [08.05.2020] */
  public static lifeCycleEntity = mapLifeCycleEntity;                                                     /* stable [08.05.2020] */
  public static listWrapperEntity = mapListWrapperEntity;                                                 /* stable [07.05.2020] */
  public static listWrapperEntityAsDisabledWrapper = mapListWrapperEntityAsDisabledWrapper;             /* stable [07.05.2020] */
  public static pagedEntity = mapPagedEntity;                                                             /* stable [07.05.2020] */
  public static paginatedEntity = mapPaginatedEntity;                                                     /* stable [07.05.2020] */
  public static paginatedLifeCycleEntity = mapPaginatedLifeCycleEntity;                                   /* stable [07.05.2020] */
  public static progressWrapperAsDisabledWrapper = mapProgressWrapperAsDisabledWrapper;                 /* stable [07.05.2020] */
  public static query = mapQuery;                                                                       /* stable [08.05.2020] */
  public static queryFilterEntity = mapQueryFilterEntity;                                                 /* stable [07.05.2020] */
  public static queryFilterEntityAsQuery = mapQueryFilterEntityAsQuery;                                   /* stable [07.05.2020] */
  public static sectionNameWrapper = mapSectionNameWrapper;                                             /* stable [07.05.2020] */
}
