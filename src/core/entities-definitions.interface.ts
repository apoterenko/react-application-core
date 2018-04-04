import {
  IPageSizeWrapper,
  IPageWrapper,
  ITotalAmountWrapper,
  ITotalCountWrapper,
  IEntitiesDataWrapper,
  IAnyDataWrapper,
  IIpWrapper,
  IMessagesWrapper,
  INameWrapper,
  IStringChannelWrapper,
  IChannelWrapper,
  IChangesWrapper,
  IDirtyWrapper,
  IErrorWrapper,
  IKeyValue,
  IProgressWrapper,
  ITouchedWrapper,
  IValidWrapper,
  IEntity,
  IEntityWrapper,
  IFormWrapper,
  IBooleanCustomErrorWrapper,
  EntityIdT,
  IBooleanNewEntityWrapper,
  IEntityIdWrapper,
  IOriginalEntityWrapper,
  IBooleanActiveWrapper,
  IEntityOnClickWrapper,
  IEntityRawDataWrapper,
  ISelectedEntityWrapper,
  IListWrapper,
  IDefaultOnSearchWrapper,
  IDefaultOnCreateWrapper,
  IEntityOnSelectWrapper,
  IDefaultOperationWrapper,
  IEntityIdTWrapper,
  IIsNewWrapper,
  IMergerWrapper,
  IOnBeforeSubmitWrapper,
  IStringQueryWrapper,
  IFilterWrapper,
  IKeyValueChangesWrapper,
  IOnClickWrapper,
  IOnChangeSortDirectionWrapper,
  ISortDirectionWrapper,
  ISortDirectionsWrapper,
  IAnyValueWrapper,
  IOnChangeWrapper,
} from './definitions.interface';

/* @stable - 05.04.2018 */
export interface IFieldChangeEntity extends INameWrapper,
                                            IAnyValueWrapper {
}

/* @stable - 04.04.2018 */
export interface ISortDirectionEntity extends INameWrapper,
                                              ISortDirectionWrapper {
}

/* @stable - 31.03.2018 */
export interface IStateEntity extends ITouchedWrapper,
                                      IProgressWrapper,
                                      IStringErrorEntity {
}

/* @stable - 01.04.2018 */
export interface IPagedEntity extends IPageWrapper,
                                      IPageSizeWrapper {
}

/* @stable - 31.03.2018 */
export interface IPaginatedEntity extends IPagedEntity,
                                          ITotalCountWrapper,
                                          ITotalAmountWrapper {
}

/* @stable - 31.03.2018 */
export interface IPaginatedEntitiesEntity extends IPaginatedEntity,
                                                  IEntitiesDataWrapper {
}

/* @stable - 31.03.2018 */
export interface IChannelMessageEntity extends IIpWrapper,
                                               INameWrapper,
                                               IStringChannelWrapper,
                                               IAnyDataWrapper {
}

/* @stable - 31.03.2018 */
export interface IChannelMessagesWrapperEntity extends IMessagesWrapper<IChannelMessageEntity[]> {
}

/* @stable - 31.03.2018 */
export interface IChannelWrapperEntity extends IChannelWrapper<IChannelMessagesWrapperEntity> {
}

/* @stable - 31.03.2018 */
export interface IErrorEntity<TError> extends IErrorWrapper<TError>,
                                              IBooleanCustomErrorWrapper {
}

/* @stable - 31.03.2018 */
export interface IStringErrorEntity extends IErrorEntity<string> {
}

/* @stable - 31.03.2018 */
export interface IBooleanErrorEntity extends IErrorEntity<boolean> {
}

/* @stable - 31.03.2018 */
export interface IEntityWrapperEntity<TEntity extends IEntity> extends IEntityWrapper<TEntity>,
                                                                       IBooleanNewEntityWrapper,
                                                                       IOriginalEntityWrapper<TEntity>,
                                                                       IEntityIdWrapper<EntityIdT> {
}

/* @stable - 31.03.2018 */
export interface IFormEntity<TChanges extends IKeyValue> extends IChangesWrapper<TChanges>,
                                                                 IDirtyWrapper,
                                                                 IValidWrapper,
                                                                 IStateEntity {
}

/* @stable - 31.03.2018 */
export interface IDefaultFormEntity extends IFormEntity<IEntity> {
}

/* @stable - 31.03.2018 */
export interface IFormWrapperEntity<TEntity extends IEntity>
  extends IFormWrapper<IFormEntity<TEntity>>,
          IEntityWrapperEntity<TEntity>,
          IOnBeforeSubmitWrapper<(apiEntity: IApiEntity<TEntity>) => void> {
}

/* @stable - 01.04.2018 */
export interface IDefaultFormWrapperEntity extends IFormWrapperEntity<IEntity> {
}

/* @stable - 31.03.2018 */
export interface IListItemEntity extends IEntityRawDataWrapper,
                                         IBooleanActiveWrapper,
                                         IEntityOnClickWrapper {
}

/* @stable - 04.04.2018 */
export interface IBaseListEntity extends IDefaultOnCreateWrapper,
                                         IEntityOnSelectWrapper {
}

/* @stable - 04.04.2018 */
export interface IListEntity extends IBaseListEntity,
                                     ISortDirectionsWrapper,
                                     IPaginatedEntitiesEntity,
                                     IKeyValueChangesWrapper,
                                     ISelectedEntityWrapper,
                                     IStateEntity,
                                     IDefaultOnSearchWrapper {
}

/* @stable - 31.03.2018 */
export interface IListWrapperEntity extends IListWrapper<IListEntity> {
}

/* @stable - 01.04.2018 */
export interface IApiEntity<TEntity extends IEntity> extends IEntityWrapperEntity<TEntity>,
                                                             IEntityIdTWrapper,
                                                             IChangesWrapper<TEntity>,
                                                             IMergerWrapper<TEntity>,
                                                             IDefaultOperationWrapper,
                                                             IIsNewWrapper {
}

/* @stable - 01.04.2018 */
export interface IDefaultApiEntity extends IApiEntity<IEntity> {
}

/* @stable - 01.04.2018 */
export interface IQueryFilterEntity extends IBooleanActiveWrapper,
                                            IStringQueryWrapper {
}

/* @stable - 01.04.2018 */
export interface IQueryFilterWrapperEntity extends IFilterWrapper<IQueryFilterEntity> {
}

/* @stable - 01.04.2018 */
export interface IFilteredListEntity<TFilter, TList> extends IFilterWrapper<TFilter>,
                                                             IListWrapper<TList> {
}

/* @stable - 01.04.2018 */
export interface IQueryFilteredListEntity extends IFilteredListEntity<IQueryFilterEntity, IListEntity> {
}

/* @stable - 05.04.2018 */
export interface IGridEntity extends IListEntity,
                                     IFieldChangeEntity,
                                     IOnChangeWrapper<(payload: IFieldChangeEntity) => void>,
                                     IOnChangeSortDirectionWrapper<(payload: ISortDirectionEntity) => void> {
}

/* @stable - 04.04.2018 */
export interface IGridWrapperEntity extends IListWrapper<IGridEntity> {
}

/* @stable - 04.04.2018 */
export interface IGridHeaderColumnEntity extends ISortDirectionEntity,
                                                 IOnClickWrapper<(payload: ISortDirectionEntity) => void> {
}
