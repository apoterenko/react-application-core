import * as R from 'ramda';

import {
  AnyT,
  IDictionariesWrapper,
  IDisabledWrapper,
  IEntity,
  IFormWrapper,
  ILayoutWrapper,
  IListWrapper,
  IOptionsWrapper,
  IPrimaryFilterWrapper,
  IProgressWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
  ISecondaryFilterWrapper,
  ISectionNameWrapper,
  IStackWrapper,
  IUserWrapper,
  IWaitingForOptionsWrapper,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { defValuesFilter } from './filter';
import {
  ConditionUtils,
  orUndef,
} from './cond';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IExtendedEntity,
  IExtendedFormEntity,
  IFormEntity,
  IListEntity,
  IOptionEntity,
  IPrimaryFilterExtendedFormEntity,
  IPrimaryFilterReduxFormEntity,
  IQueryFilterEntity,
  IReduxActiveQueryEntity,
  IReduxBaseSelectEntity,
  IReduxDictionariesEntity,
  IReduxDictionaryEntity,
  IReduxFormEntity,
  IReduxHolderDictionariesEntity,
  IReduxHolderLayoutEntity,
  IReduxHolderStackEntity,
  IReduxHolderUserEntity,
  IReduxLayoutEntity,
  IReduxLifeCycleEntity,
  IReduxPagedEntity,
  IReduxPaginatedEntity,
  IReduxPaginatedLifeCycleEntity,
  IReduxStackEntity,
  IReduxStoreEntity,
  IReduxUserEntity,
  ISecondaryFilterExtendedFormEntity,
  ISecondaryFilterFormEntity,
  ISecondaryFilterReduxFormEntity,
  ISelectOptionEntity,
} from '../definition';
import { Selectors } from './select';
import { WrapperUtils } from './wrapper';
import { isNewEntity } from './entity';
import { nvl } from './nvl';
import { TypeUtils } from './type';

/**
 * @stable [09.06.2020]
 * @param {TValue} stack
 * @returns {IStackWrapper<TValue>}
 */
const mapStack = <TValue>(stack: TValue): IStackWrapper<TValue> =>
  defValuesFilter<IStackWrapper<TValue>, IStackWrapper<TValue>>({stack});

/**
 * @stable [09.06.2020]
 * @param {TUser} user
 * @returns {IUserWrapper<TUser>}
 */
const mapUser = <TUser>(user: TUser): IUserWrapper<TUser> =>
  defValuesFilter<IUserWrapper<TUser>, IUserWrapper<TUser>>({user});

/**
 * @stable [09.06.2020]
 * @param {TValue} options
 * @returns {IOptionsWrapper<TValue>}
 */
const mapOptions = <TValue>(options: TValue): IOptionsWrapper<TValue> =>
  defValuesFilter<IOptionsWrapper<TValue>, IOptionsWrapper<TValue>>({options});

/**
 * @stable [09.06.2020]
 * @param {TValue} layout
 * @returns {ILayoutWrapper<TValue>}
 */
const mapLayout = <TValue>(layout: TValue): ILayoutWrapper<TValue> =>
  defValuesFilter<ILayoutWrapper<TValue>, ILayoutWrapper<TValue>>({layout});

/**
 * @stable [09.06.2020]
 * @param {boolean} waitingForOptions
 * @returns {IWaitingForOptionsWrapper}
 */
const mapWaitingForOptions = (waitingForOptions: boolean): IWaitingForOptionsWrapper =>
  defValuesFilter<IWaitingForOptionsWrapper, IWaitingForOptionsWrapper>({waitingForOptions});

/**
 * @stable [09.06.2020]
 * @param {TForm} form
 * @returns {IFormWrapper<TForm>}
 */
const mapForm = <TForm>(form: TForm): IFormWrapper<TForm> =>
  defValuesFilter<IFormWrapper<TForm>, IFormWrapper<TForm>>({form});

/**
 * @stable [09.06.2020]
 * @param {boolean} disabled
 * @returns {IDisabledWrapper}
 */
const mapDisabled = (disabled: boolean): IDisabledWrapper =>
  defValuesFilter<IDisabledWrapper, IDisabledWrapper>({disabled});

/**
 * @stable [09.06.2020]
 * @param {string} sectionName
 * @returns {ISectionNameWrapper}
 */
const mapSectionName = (sectionName: string): ISectionNameWrapper =>
  defValuesFilter<ISectionNameWrapper, ISectionNameWrapper>({sectionName});

/**
 * @map-as-wrapper
 *
 * @stable [09.06.2020]
 * @param {ISectionNameWrapper} wrapper
 * @returns {ISectionNameWrapper}
 */
const mapSectionNameWrapper = (wrapper: ISectionNameWrapper): ISectionNameWrapper =>
  mapSectionName(Selectors.sectionName(wrapper));

/**
 * @map-as-wrapper
 *
 * @stable [09.06.2020]
 * @param {TList} list
 * @returns {IListWrapper<TList>}
 */
const mapList = <TList>(list: TList): IListWrapper<TList> =>
  defValuesFilter<IListWrapper<TList>, IListWrapper<TList>>({list});

/**
 * @map-as-wrapper
 *
 * @stable [09.06.2020]
 * @param {TEntity} queryFilter
 * @returns {IQueryFilterWrapper<TEntity>}
 */
const mapQueryFilter = <TEntity = string>(queryFilter: TEntity): IQueryFilterWrapper<TEntity> =>
  defValuesFilter<IQueryFilterWrapper<TEntity>, IQueryFilterWrapper<TEntity>>({queryFilter});

/**
 * @map-as-wrapper
 *
 * @stable [09.06.2020]
 * @param {TEntity} primaryFilter
 * @returns {IPrimaryFilterWrapper<TEntity>}
 */
const mapPrimaryFilter = <TEntity = string>(primaryFilter: TEntity): IPrimaryFilterWrapper<TEntity> =>
  defValuesFilter<IPrimaryFilterWrapper<TEntity>, IPrimaryFilterWrapper<TEntity>>({primaryFilter});

/**
 * @map-as-wrapper
 *
 * @stable [09.06.2020]
 * @param {TEntity} secondaryFilter
 * @returns {ISecondaryFilterWrapper<TEntity>}
 */
const mapSecondaryFilter = <TEntity = string>(secondaryFilter: TEntity): ISecondaryFilterWrapper<TEntity> =>
  defValuesFilter<ISecondaryFilterWrapper<TEntity>, ISecondaryFilterWrapper<TEntity>>({secondaryFilter});

/**
 * @map-as-wrapper
 *
 * @stable [09.06.2020]
 * @param {string} query
 * @returns {IQueryWrapper}
 */
const mapQuery = (query: string): IQueryWrapper => defValuesFilter<IQueryWrapper, IQueryWrapper>({query});

/**
 * @map-as-wrapper
 *
 * @stable [09.06.2020]
 * @param {TValue} dictionaries
 * @returns {IDictionariesWrapper<TValue>}
 */
const mapDictionaries = <TValue>(dictionaries: TValue): IDictionariesWrapper<TValue> =>
  defValuesFilter<IDictionariesWrapper<TValue>, IDictionariesWrapper<TValue>>({dictionaries});

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IQueryFilterEntity} entity
 * @returns {IQueryFilterEntity}
 */
const mapQueryFilterEntity = (entity: IQueryFilterEntity): IQueryFilterEntity =>
  mapQueryFilter(Selectors.queryFilter(entity));

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IListEntity} entity
 * @returns {IListEntity}
 */
const mapListEntity = (entity: IListEntity): IListEntity => mapList(Selectors.list(entity));

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IFormEntity<TEntity>} entity
 * @returns {IFormEntity<TEntity>}
 */
const mapFormEntity = <TEntity = IEntity>(entity: IFormEntity<TEntity>): IFormEntity<TEntity> =>
  mapForm(Selectors.form(entity));

/**
 * @map-as
 *
 * @stable [09.06.2020]
 * @param {IProgressWrapper} entity
 * @returns {IDisabledWrapper}
 */
const mapProgressAsDisabled = (entity: IProgressWrapper): IDisabledWrapper => mapDisabled(WrapperUtils.inProgress(entity));

/**
 * @map-as
 *
 * @stable [09.06.2020]
 * @param {IListEntity} listEntity
 * @returns {IDisabledWrapper}
 */
const mapListEntityAsDisabled = (listEntity: IListEntity): IDisabledWrapper =>
  mapProgressAsDisabled(Selectors.list(listEntity));

/**
 * @mapper
 * @stable [09.05.2020]
 * @param {ISecondaryFilterFormEntity<TEntity>} entity
 * @returns {IFormEntity<TEntity>}
 */
const mapSecondaryFilterFormEntityAsFormEntity =
  <TEntity = IEntity>(entity: ISecondaryFilterFormEntity<TEntity>): IFormEntity<TEntity> =>
    mapFormEntity(Selectors.secondaryFilter(entity));

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
const mapPagedEntity = (entity: IReduxPagedEntity): IReduxPagedEntity => ConditionUtils.ifNotNilThanValue(
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
 * @stable [19.05.2020]
 * @param {ISelectOptionEntity<TRawData>} entity
 * @returns {ISelectOptionEntity<TRawData>}
 */
const mapSelectOptionEntity =
  <TRawData = IEntity>(entity: ISelectOptionEntity<TRawData>): ISelectOptionEntity<TRawData> =>
    defValuesFilter<ISelectOptionEntity<TRawData>, ISelectOptionEntity<TRawData>>({
      disabled: entity.disabled,
      label: entity.label,
      rawData: entity.rawData,
      value: entity.value,
    });

/**
 * @stable [19.05.2020]
 * @param {TEntity} entity
 * @returns {ISelectOptionEntity<TEntity extends IOptionEntity>}
 */
const mapOptionEntityAsSelectOptionEntity =
  <TEntity extends IOptionEntity>(entity: TEntity): ISelectOptionEntity<TEntity> =>
    mapSelectOptionEntity<TEntity>({
      value: entity.id,
      label: entity.name,
      disabled: entity.disabled,
      rawData: entity,
    });

/**
 * @stable [19.05.2020]
 * @param {TEntity[] | TEntity} data
 * @returns {Array<ISelectOptionEntity<TEntity extends IOptionEntity>>}
 */
const mapOptionEntitiesAsSelectOptionEntities =
  <TEntity extends IOptionEntity>(data: TEntity[] | TEntity): Array<ISelectOptionEntity<TEntity>> =>
    ConditionUtils.ifNotNilThanValue(
      data,
      () => [].concat(data).map((entity) => mapOptionEntityAsSelectOptionEntity(entity)),
      UNDEF_SYMBOL
    );

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
    } = formEntity || {} as IReduxFormEntity<TEntity>;
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
 * @stable [10.05.2020]
 * @param {IReduxFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {IExtendedFormEntity<TEntity>}
 */
const mapEntityAsExtendedFormEntity = <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                                          entity?: TEntity): IExtendedFormEntity<TEntity> =>
  ({
    ...mapForm(formEntity),
    ...mapEntityAsExtendedEntity(formEntity, entity),
  });

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {TEntity}
 */
const mapExtendedFormEntityAsFinalEntity = <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                                               entity?: TEntity): TEntity =>
  mapEntityAsExtendedFormEntity(formEntity, entity).entity;

/**
 * @mapper
 * @stable [09.05.2020]
 * @param {IListEntity<TEntity>} listEntity
 * @param {IReduxFormEntity<TEntity>} formEntity
 * @returns {IExtendedFormEntity<TEntity>}
 */
const mapListSelectedEntityAsExtendedFormEntity =
  <TEntity = IEntity>(listEntity: IListEntity<TEntity>,
                      formEntity: IReduxFormEntity<TEntity>): IExtendedFormEntity<TEntity> =>
    mapEntityAsExtendedFormEntity(
      formEntity,
      Selectors.listSelectedEntity(listEntity)
    );

/**
 * @stable [10.05.2020]
 * @param {IListEntity<TEntity>} listEntity
 * @param {IReduxFormEntity<TEntity>} formEntity
 * @returns {TEntity}
 */
const mapListSelectedExtendedFormEntityAsFinalEntity =
  <TEntity = IEntity>(listEntity: IListEntity<TEntity>,
                      formEntity: IReduxFormEntity<TEntity>): TEntity =>
    mapListSelectedEntityAsExtendedFormEntity<TEntity>(listEntity, formEntity).entity;

/**
 * @mapper
 * @stable [08.05.2020]
 * @param {IReduxActiveQueryEntity} entity
 * @returns {IReduxActiveQueryEntity}
 */
const mapActiveQueryEntity = (entity: IReduxActiveQueryEntity): IReduxActiveQueryEntity => ConditionUtils.ifNotNilThanValue(
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
const mapLifeCycleEntity = (entity: IReduxLifeCycleEntity): IReduxLifeCycleEntity => ConditionUtils.ifNotNilThanValue(
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
  ConditionUtils.ifNotNilThanValue(
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
 * @stable [09.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @param {number} pageSize
 * @returns {IReduxPagedEntity}
 */
const mapPaginatedEntityAsPagedEntity =
  (entity: IReduxPaginatedEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
    ConditionUtils.ifNotNilThanValue(
      entity,
      () => mapPagedEntity({
        page: entity.lockPage ? entity.page : FIRST_PAGE,  // lockPage <=> backward, forward, last, first
        pageSize,
      }),
      UNDEF_SYMBOL
    );

/**
 * @mapper
 * @stable [09.05.2020]
 * @param {IListEntity} entity
 * @param {number} pageSize
 * @returns {IReduxPagedEntity}
 */
const mapListEntityAsPagedEntity = (entity: IListEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
  mapPaginatedEntityAsPagedEntity(Selectors.list(entity), pageSize);

/**
 * @map-as-original
 *
 * @stable [10.06.2020]
 * @param {IReduxPaginatedLifeCycleEntity} entity
 * @returns {IReduxPaginatedLifeCycleEntity}
 */
const mapPaginatedLifeCycleEntity = (entity: IReduxPaginatedLifeCycleEntity): IReduxPaginatedLifeCycleEntity => ({
  ...mapLifeCycleEntity(entity),
  ...mapPaginatedEntity(entity),
});

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxHolderLayoutEntity<TEntity>} wrapper
 * @returns {IReduxHolderLayoutEntity<TEntity>}
 */
const mapHolderLayoutEntity =
  <TEntity = IReduxLayoutEntity>(wrapper: IReduxHolderLayoutEntity<TEntity>): IReduxHolderLayoutEntity<TEntity> =>
    mapLayout(Selectors.layout(wrapper));

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxHolderStackEntity<TEntity>} wrapper
 * @returns {IReduxHolderStackEntity<TEntity>}
 */
const mapHolderStackEntity =
  <TEntity = IReduxStackEntity>(wrapper: IReduxHolderStackEntity<TEntity>): IReduxHolderStackEntity<TEntity> =>
    mapStack(Selectors.stack(wrapper));

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxHolderUserEntity<TEntity>} wrapper
 * @returns {IReduxHolderUserEntity<TEntity>}
 */
const mapHolderUserEntity =
  <TEntity = IReduxUserEntity>(wrapper: IReduxHolderUserEntity<TEntity>): IReduxHolderUserEntity<TEntity> =>
    mapUser(Selectors.user(wrapper));

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxHolderDictionariesEntity<TEntity>} wrapper
 * @returns {IReduxHolderDictionariesEntity<TEntity>}
 */
const mapHolderDictionariesEntity =
  <TEntity = IReduxDictionariesEntity>(wrapper: IReduxHolderDictionariesEntity<TEntity>): IReduxHolderDictionariesEntity<TEntity> =>
    mapDictionaries(Selectors.dictionaries(wrapper));

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IPrimaryFilterReduxFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {TEntity}
 */
const mapPrimaryFilterEntityAsFinalEntity = <TEntity = IEntity>(formEntity: IPrimaryFilterReduxFormEntity<TEntity>,
                                                                entity?: TEntity): TEntity =>
  mapExtendedFormEntityAsFinalEntity(Selectors.primaryFilter(formEntity), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {ISecondaryFilterReduxFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {TEntity}
 */
const mapSecondaryFilterEntityAsFinalEntity = <TEntity = IEntity>(formEntity: ISecondaryFilterReduxFormEntity<TEntity>,
                                                                  entity?: TEntity): TEntity =>
  mapExtendedFormEntityAsFinalEntity(Selectors.secondaryFilter(formEntity), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxFormEntity<TEntity>} reduxFormEntity
 * @param {TEntity} entity
 * @returns {IPrimaryFilterExtendedFormEntity<TEntity>}
 */
const mapEntityAsPrimaryFilterExtendedFormEntity =
  <TEntity = IEntity>(reduxFormEntity: IReduxFormEntity<TEntity>,
                      entity?: TEntity): IPrimaryFilterExtendedFormEntity<TEntity> =>
    mapPrimaryFilter(
      mapEntityAsExtendedFormEntity(reduxFormEntity, entity)
    );

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IPrimaryFilterReduxFormEntity<TEntity>} wrapper
 * @param {TEntity} entity
 * @returns {IPrimaryFilterExtendedFormEntity<TEntity>}
 */
const mapPrimaryFilterEntityAsPrimaryFilterExtendedFormEntity =
  <TEntity = IEntity>(wrapper: IPrimaryFilterReduxFormEntity<TEntity>,
                      entity?: TEntity): IPrimaryFilterExtendedFormEntity<TEntity> =>
    mapEntityAsPrimaryFilterExtendedFormEntity(Selectors.primaryFilter(wrapper), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxFormEntity<TEntity>} reduxFormEntity
 * @param {TEntity} entity
 * @returns {ISecondaryFilterExtendedFormEntity<TEntity>}
 */
const mapEntityAsSecondaryFilterExtendedFormEntity =
  <TEntity = IEntity>(reduxFormEntity: IReduxFormEntity<TEntity>,
                      entity?: TEntity): ISecondaryFilterExtendedFormEntity<TEntity> =>
    mapSecondaryFilter(
      mapEntityAsExtendedFormEntity(reduxFormEntity, entity)
    );

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {ISecondaryFilterReduxFormEntity<TEntity>} wrapper
 * @param {TEntity} entity
 * @returns {ISecondaryFilterExtendedFormEntity<TEntity>}
 */
const mapSecondaryFilterEntityAsSecondaryFilterExtendedFormEntity =
  <TEntity = IEntity>(wrapper: ISecondaryFilterReduxFormEntity<TEntity>,
                      entity?: TEntity): ISecondaryFilterExtendedFormEntity<TEntity> =>
    mapEntityAsSecondaryFilterExtendedFormEntity(Selectors.secondaryFilter(wrapper), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IQueryFilterEntity & IListEntity<TEntity>} wrapper
 * @returns {TFilter}
 */
const mapFullSearchFilter = <TFilter, TEntity = IEntity>(wrapper: IQueryFilterEntity & IListEntity<TEntity>): TFilter => ({
  ...mapQueryFilterEntityAsQuery(wrapper),
  ...mapListEntityAsPagedEntity(wrapper),
  ...mapPrimaryFilterEntityAsFinalEntity(wrapper),
  ...mapSecondaryFilterEntityAsFinalEntity(wrapper),
}) as TFilter;

/**
 * @stable [19.05.2020]
 * @param {IReduxDictionaryEntity<TEntity>} dictionaryEntity
 * @param {(data: (TEntity[] | TEntity)) => AnyT} accessor
 * @returns {Array<ISelectOptionEntity<TEntity>>}
 */
const mapDictionaryEntityAsSelectOptionEntities =
  <TEntity>(dictionaryEntity: IReduxDictionaryEntity<TEntity>,
            accessor?: (data: TEntity | TEntity[]) => AnyT): Array<ISelectOptionEntity<TEntity>> =>
    GenericMappers.optionEntitiesAsSelectOptionEntities(
      ConditionUtils.ifNotNilThanValue(
        Selectors.data(dictionaryEntity),
        (data) => TypeUtils.isFn(accessor) ? accessor(data) : data
      )
    );

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
      ...mapWaitingForOptions(WrapperUtils.isLoading(entity)),
      ...mapOptions(mapDictionaryEntityAsSelectOptionEntities<TEntity>(entity, accessor)),
    });

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxStoreEntity<TDictionaries>} entity
 * @returns {IReduxStoreEntity<TDictionaries>}
 */
const mapStoreEntity =
  <TDictionaries = {}>(entity: IReduxStoreEntity<TDictionaries>): IReduxStoreEntity<TDictionaries> =>
    ({
      ...mapHolderDictionariesEntity(entity),
      ...mapHolderLayoutEntity(entity),
      ...mapHolderStackEntity(entity),
      ...mapHolderUserEntity(entity),
    });

/**
 * @stable [06.05.2020]
 */
export class GenericMappers {
  public static readonly activeQueryEntity = mapActiveQueryEntity;                                                                                /* stable [07.05.2020] */
  public static readonly dictionaryEntityAsSelectEntity = mapDictionaryEntityAsSelectEntity;                                                      /* stable [19.05.2020] */
  public static readonly dictionaryEntityAsSelectOptionEntities = mapDictionaryEntityAsSelectOptionEntities;                                      /* stable [19.05.2020] */
  public static readonly disabled = mapDisabled;                                                                                                  /* stable [07.05.2020] */
  public static readonly entityAsExtendedEntity = mapEntityAsExtendedEntity;                                                                      /* stable [08.05.2020] */
  public static readonly entityAsExtendedFormEntity = mapEntityAsExtendedFormEntity;                                                              /* stable [10.05.2020] */
  public static readonly extendedEntity = mapExtendedEntity;                                                                                      /* stable [08.05.2020] */
  public static readonly form = mapForm;                                                                                                          /* stable [08.05.2020] */
  public static readonly formEntity = mapFormEntity;                                                                                              /* stable [08.05.2020] */
  public static readonly fullSearchFilter = mapFullSearchFilter;                                                                                  /* stable [10.05.2020] */
  public static readonly holderDictionariesEntity = mapHolderDictionariesEntity;                                                                  /* stable [09.06.2020] */
  public static readonly holderLayoutEntity = mapHolderLayoutEntity;                                                                              /* stable [09.06.2020] */
  public static readonly holderStackEntity = mapHolderStackEntity;                                                                                /* stable [09.06.2020] */
  public static readonly holderUserEntity = mapHolderUserEntity;                                                                                  /* stable [09.06.2020] */
  public static readonly listEntity = mapListEntity;                                                                                              /* stable [07.05.2020] */
  public static readonly listEntityAsDisabled = mapListEntityAsDisabled;                                                                          /* stable [08.05.2020] */
  public static readonly listEntityAsPagedEntity = mapListEntityAsPagedEntity;                                                                    /* stable [09.05.2020] */
  public static readonly listSelectedEntityAsExtendedFormEntity = mapListSelectedEntityAsExtendedFormEntity;                                      /* stable [09.05.2020] */
  public static readonly listSelectedExtendedFormEntityAsFinalEntity = mapListSelectedExtendedFormEntityAsFinalEntity;                            /* stable [10.05.2020] */
  public static readonly optionEntitiesAsSelectOptionEntities = mapOptionEntitiesAsSelectOptionEntities;                                          /* stable [19.05.2020] */
  public static readonly options = mapOptions;                                                                                                    /* stable [19.05.2020] */
  public static readonly pagedEntity = mapPagedEntity;                                                                                            /* stable [07.05.2020] */
  public static readonly paginatedEntity = mapPaginatedEntity;                                                                                    /* stable [07.05.2020] */
  public static readonly paginatedLifeCycleEntity = mapPaginatedLifeCycleEntity;                                                                  /* stable [07.05.2020] */
  public static readonly primaryFilterEntityAsPrimaryFilterExtendedFormEntity = mapPrimaryFilterEntityAsPrimaryFilterExtendedFormEntity;          /* stable [10.05.2020] */
  public static readonly query = mapQuery;                                                                                                        /* stable [08.05.2020] */
  public static readonly queryFilter = mapQueryFilter;                                                                                            /* stable [08.05.2020] */
  public static readonly queryFilterEntity = mapQueryFilterEntity;                                                                                /* stable [07.05.2020] */
  public static readonly queryFilterEntityAsQuery = mapQueryFilterEntityAsQuery;                                                                  /* stable [07.05.2020] */
  public static readonly secondaryFilterEntityAsSecondaryFilterExtendedFormEntity = mapSecondaryFilterEntityAsSecondaryFilterExtendedFormEntity;  /* stable [10.05.2020] */
  public static readonly secondaryFilterFormEntityAsFormEntity = mapSecondaryFilterFormEntityAsFormEntity;                                        /* stable [09.05.2020] */
  public static readonly sectionName = mapSectionName;                                                                                            /* stable [08.05.2020] */
  public static readonly sectionNameWrapper = mapSectionNameWrapper;                                                                              /* stable [08.05.2020] */
  public static readonly storeEntity = mapStoreEntity;                                                                                            /* stable [09.06.2020] */
  public static readonly waitingForOptions = mapWaitingForOptions;                                                                                /* stable [19.05.2020] */
}
