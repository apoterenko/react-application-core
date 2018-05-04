import { Component, ComponentClass, ComponentLifecycle } from 'react';
import { History } from 'history';

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
  IActiveWrapper,
  IEntityOnClickWrapper,
  IEntityRawDataWrapper,
  ISelectedEntityWrapper,
  IListWrapper,
  IDefaultOnSearchWrapper,
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
  IValueWrapper,
  IOnChangeWrapper,
  ISelectedWrapper,
  IDefaultOnClickWrapper,
  IStringProgressMessageWrapper,
  IOnSubmitWrapper,
  IFieldsWrapper,
  IDefaultOnValidWrapper,
  IOnEmptyDictionaryWrapper,
  IOnLoadDictionaryWrapper,
  IDefaultOnResetWrapper,
  IReadyWrapper,
  IAuthorizedWrapper,
  IApplicationWrapper,
  IStringIdWrapper,
  IApiEntityWrapper,
  IEditApiWrapper,
  IAddApiWrapper,
  IExtraParamsWrapper,
  ITransportWrapper,
  IQueueWrapper,
  IStringTokenWrapper,
  IBrowserLocationWrapper,
  IKeyValueRouteParamsWrapper,
  IURLSearchQueryParamsWrapper,
  ILinkedToSectionsWrapper,
  IStringSectionWrapper,
  ILockWrapper,
  INeedToDestroySectionsWrapper,
  IStackWrapper,
  IStringTitleWrapper,
  IClassNameWrapper,
  ILayoutWrapper,
  IModeWrapper,
  IUserWrapper,
  IStringEmailWrapper,
  IStringLoginWrapper,
  INamedEntity,
  IPasswordWrapper,
  IRootWrapper,
  IStringPathWrapper,
  INotificationWrapper,
  IStringInfoWrapper,
  IStringErrorMessageWrapper,
  ICssStyleWrapper,
  IStringMessageWrapper,
  IHtmlElementSelfWrapper,
  IStateWrapper,
  IPathWrapper,
  IDisabledWrapper,
  IDataWrapper,
  IDictionariesWrapper,
  ILoadingWrapper,
  AnyT,
  IDispatchWrapper,
  IStopEventWrapper,
  IBasicEvent,
  IUrlWrapper,
} from './definitions.interface';
import {
  ITabConfiguration,
  IUniversalComponentConfiguration,
  IComponentConfiguration,
} from './configurations-definitions.interface';
import { IContainerProps } from './props-definitions.interface';

/**
 * @stable [04.05.2018]
 */
export interface IUniversalComponentEntity {
}

/**
 * @stable [04.05.2018]
 */
export interface IUniversalComponentPlugin<TProps = {}, TState = {}> extends ComponentLifecycle<TProps, TState> {
}

/**
 * @stable [23.04.2018]
 */
export interface IUniversalComponentClassEntity<TProps extends IUniversalComponentEntity = TProps, TState = {}>
  extends ComponentClass<TProps> {
}

/* @stable - 05.04.2018 */
export interface IFieldChangeEntity extends INameWrapper,
                                            IValueWrapper {
}

/* @stable - 09.04.2018 */
export interface IFieldsChangesEntity extends IFieldsWrapper<IFieldChangeEntity[]> {
}

/* @stable - 09.04.2018 */
export type FieldChangeEntityT = IFieldChangeEntity | IFieldsChangesEntity;

/* @stable - 04.04.2018 */
export interface ISortDirectionEntity extends INameWrapper,
                                              ISortDirectionWrapper {
}

/* @stable [23.04.2018] */
export interface IUniversalStateEntity extends ITouchedWrapper,
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
                                                                 IUniversalStateEntity {
}

/* @stable - 31.03.2018 */
export interface IDefaultFormEntity extends IFormEntity<IEntity> {
}

/* @stable - 11.04.2018 */
export interface IBaseFormWrapperEntity<TEntity extends IEntity>
  extends IFormWrapper<IFormEntity<TEntity>>,
          IEntityWrapperEntity<TEntity>,
          IOnBeforeSubmitWrapper<(apiEntity: IApiEntity<TEntity>) => boolean> {
}

/* @stable - 11.04.2018 */
export interface IDefaultBaseFormWrapperEntity extends IBaseFormWrapperEntity<IEntity> {
}

/* @stable - 09.04.2018 */
export interface IFormWrapperEntity<TEntity extends IEntity>
  extends IBaseFormWrapperEntity<TEntity>,
          IOnChangeWrapper<(payload: IFieldChangeEntity) => void>,
          IOnSubmitWrapper<(payload: IApiEntity<TEntity>) => void>,
          IOnEmptyDictionaryWrapper,
          IOnLoadDictionaryWrapper,
          IDefaultOnValidWrapper,
          IDefaultOnResetWrapper {
}

/* @stable - 01.04.2018 */
export interface IDefaultFormWrapperEntity extends IFormWrapperEntity<IEntity> {
}

/* @stable [23.04.2018] */
export interface IUniversalListEntity extends IUniversalComponentEntity,
                                              IUniversalStateEntity,
                                              IPaginatedEntitiesEntity,
                                              ISelectedEntityWrapper {
}

/* @stable [24.04.2018] */
export interface IUniversalListItemEntity extends IUniversalComponentEntity,
                                                  IEntityRawDataWrapper,
                                                  IEntityOnClickWrapper,
                                                  IActiveWrapper {
}

/* @stable [24.04.2018] */
export interface IRnListItemEntity extends IUniversalListItemEntity {
}

/* @stable - 31.03.2018 */
export interface IListItemEntity extends IUniversalListItemEntity,
                                         IComponentEntity {
}

/* @stable - 24.04.2018 */
export interface IRnListEntity extends IUniversalListEntity {
}

/* @stable - 04.04.2018 */
export interface IListEntity extends IUniversalListEntity,
                                     ISortDirectionsWrapper,
                                     IKeyValueChangesWrapper,
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

/* @stable - 12.04.2018 */
export interface IEditableApiEntity<TEntity extends IEntity> extends IApiEntityWrapper<IApiEntity<TEntity>>,
                                                                     IExtraParamsWrapper<IKeyValue>,
                                                                     IEditApiWrapper,
                                                                     IAddApiWrapper {
}

/* @stable - 01.04.2018 */
export interface IQueryFilterEntity extends IActiveWrapper,
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

/* @stable [23.04.2018] */
export interface IGridHeaderColumnEntity extends IComponentEntity,
                                                 ISortDirectionEntity,
                                                 IOnClickWrapper<(payload: ISortDirectionEntity) => void> {
}

/* @stable - 05.04.2018 */
export interface IGridRowEntity extends IComponentEntity,
                                        ISelectedWrapper,
                                        IDefaultOnClickWrapper {
}

/* @stable - 06.04.2018 */
export interface ITabPanelEntity extends IOnClickWrapper<(payload: ITabConfiguration) => void> {
}

/* @stable - 19.04.2018 */
export interface IUniversalButtonEntity extends IUniversalComponentEntity,
                                                IProgressWrapper,
                                                IDisabledWrapper,
                                                IStringProgressMessageWrapper,
                                                IStringErrorMessageWrapper,
                                                IBooleanErrorEntity {
}

/* @stable [23.04.2018] */
export interface IUniversalMessageEntity extends IUniversalComponentEntity,
                                                 IUniversalStateEntity {
}

/* @stable - 08.04.2018 */
export interface IProgressLabelEntity extends IStringProgressMessageWrapper {
}

/* @stable - 25.04.2018 */
export interface IUniversalApplicationEntity extends IUniversalContainerEntity,
                                                     IUniversalStateEntity,
                                                     IAuthorizedWrapper,
                                                     IReadyWrapper {
}

/* @stable - 25.04.2018 */
export interface IRnApplicationEntity extends IUniversalApplicationEntity {
}

/* @stable - 11.04.2018 */
export interface IApplicationEntity extends IUniversalApplicationEntity,
                                            IWebContainerEntity {
}

/* @stable - 11.04.2018 */
export interface IApplicationWrapperEntity extends IApplicationWrapper<IApplicationEntity> {
}

/* @stable - 11.04.2018 */
export interface IOperationEntity extends IStringIdWrapper {
}

/* @stable - 11.04.2018 */
export interface IFieldEntity extends IComponentEntity,
                                      IValueWrapper,
                                      IStringMessageWrapper {
}

/* @stable - 12.04.2018 */
export interface IUniversalContainerEntity extends IChannelWrapperEntity,
                                                   ILayoutWrapperEntity,
                                                   IUserWrapperEntity,
                                                   INotificationWrapperEntity,
                                                   ITransportWrapperEntity {
  sectionName?: string; // TODO
}

/* @stable - 25.04.2018 */
export interface IWebContainerEntity extends IRootWrapperEntity,
                                             IBrowserLocationWrapper,
                                             IURLSearchQueryParamsWrapper,
                                             IKeyValueRouteParamsWrapper {
}

/* @stable - 14.04.2018 */
export interface IContainerEntity extends IUniversalContainerEntity,
                                          IWebContainerEntity {
}

/* @stable - 14.04.2018 */
export interface IContainerClassEntity extends ComponentClass<IContainerEntity> {
}

/* @stable [23.04.2018] */
export interface IComponentEntity extends IUniversalComponentEntity,
                                          IClassNameWrapper,  // TODO remove
                                          IStringTitleWrapper {
}

/* @stable - 15.04.2018 */
export interface IComponentClassEntity<TProps extends IComponentEntity = TProps,
                                       TState = {}>
  extends IUniversalComponentClassEntity<TProps>,
          IHtmlElementSelfWrapper {
}

/* @stable - 12.04.2018 */
export interface ITransportEntity extends IStringTokenWrapper,
                                          IQueueWrapper<string[]> {
}

/* @stable - 15.04.2018 */
export interface ITransportWrapperEntity extends ITransportWrapper<ITransportEntity> {
}

/* @stable - 15.04.2018 */
export interface IRouterComponentEntity extends History {
}

/* @stable - 15.04.2018 */
export interface IStackItemEntity extends IStringSectionWrapper,
                                          ILinkedToSectionsWrapper {
}

/* @stable - 15.04.2018 */
export interface IStackEntity extends IStackWrapper<IStackItemEntity[]>,
                                      ILockWrapper,
                                      INeedToDestroySectionsWrapper {
}

/* @stable - 15.04.2018 */
export interface IStackWrapperEntity extends IStackWrapper<IStackEntity> {
}

/* @stable - 15.04.2018 */
export type LayoutT = 'full' | 'minimal';

/* @stable - 15.04.2018 */
export interface ILayoutEntity extends IModeWrapper<LayoutT> {
}

/* @stable - 15.04.2018 */
export interface ILayoutWrapperEntity extends ILayoutWrapper<ILayoutEntity> {
}

/* @stable - 15.04.2018 */
export interface IUserEntity extends INamedEntity,
                                     IUrlWrapper,
                                     IPasswordWrapper,
                                     IStringLoginWrapper,
                                     IStringEmailWrapper {
}

/* @stable - 15.04.2018 */
export interface IUserWrapperEntity extends IUserWrapper<IUserEntity> {
}

/* @stable - 15.04.2018 */
export interface IRootEntity extends IStringPathWrapper {
}

/* @stable - 15.04.2018 */
export interface IRootWrapperEntity extends IRootWrapper<IRootEntity> {
}

/* @stable - 15.04.2018 */
export interface INotificationEntity extends IStringErrorEntity,
                                             IStringInfoWrapper {
}

/* @stable - 15.04.2018 */
export interface INotificationWrapperEntity extends INotificationWrapper<INotificationEntity> {
}

/* @stable - 15.04.2018 */
export interface INavigateEntity<TPath, TState = {}> extends IPathWrapper<TPath>,
                                                             IStateWrapper<TState> {
}

/* @stable - 22.04.2018 */
export interface IDictionaryEntity<TData> extends IDataWrapper<TData[] | TData>,
                                                               ILoadingWrapper {
}

/* @stable - 22.04.2018 */
export interface IDictionariesWrapperEntity extends IDictionariesWrapper<IDictionariesEntity> {
}

/* @stable - 22.04.2018 */
export interface IDictionariesEntity {
  [dictionary: string]: IDictionaryEntity<{}>;
}

/* @stable - 23.07.2018 */
export interface IUniversalApplicationStoreEntity<TDictionaries = {}> extends IApplicationWrapperEntity,
                                                                              IUserWrapperEntity,
                                                                              IChannelWrapperEntity,
                                                                              ITransportWrapperEntity,
                                                                              IDictionariesWrapper<TDictionaries> {
}

/* @stable - 23.07.2018 */
export interface IApplicationStoreEntity<TDictionaries = {}> extends IUniversalApplicationStoreEntity<TDictionaries>,
                                                                     IStackWrapperEntity,
                                                                     ILayoutWrapperEntity,
                                                                     INotificationWrapperEntity,
                                                                     IRootWrapperEntity {
}

/* @stable [12.04.2018] */
export interface IUniversalContainer<TProps extends IUniversalContainerEntity = IUniversalContainerEntity, TState = {}>
  extends Component<TProps, TState>,
          IDispatchWrapper<(type: string, data?: AnyT) => void> {
}

/* @stable [23.04.2018] */
export interface IUniversalComponentProps extends IUniversalComponentEntity,
                                                  IUniversalComponentConfiguration {
}

/* @stable [23.04.2018] */
export interface IUniversalComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                     TState = {}>
  extends Component<TProps, TState> {
}

/* @stable - 23.04.2018 */
export interface IUniversalComponentPluginClassEntity<
  TComponent extends IUniversalComponent<TProps, TState> = IUniversalComponent<TProps, TState>,
  TProps extends IUniversalComponentProps = IUniversalComponentProps,
  TState = {}
> {
  new(component: TComponent): IUniversalComponentPlugin<TProps, TState>;
}

/* @stable - 23.04.2018 */
export type UniversalComponentPluginFactoryT = (component: IUniversalComponent) => IUniversalComponentPlugin;

/* @stable [23.04.2018] */
export interface IComponentProps extends IComponentEntity,
                                         IComponentConfiguration {
}

/* @stable [23.04.2018] */
export interface IComponent<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IUniversalComponent<TProps, TState>,
          IStopEventWrapper<(event: IBasicEvent) => void>,
          IHtmlElementSelfWrapper {
}

/* @stable [23.04.2018] */
export interface IContainer<TProps extends IContainerProps = IContainerProps, TState = {}>
  extends IUniversalContainer<TProps, TState> {
}
