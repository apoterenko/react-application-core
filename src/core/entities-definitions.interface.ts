import { Component, ComponentClass, ComponentLifecycle } from 'react';
import { History } from 'history';

import {
  IPageSizeWrapper,
  IPageWrapper,
  ITotalAmountWrapper,
  ITotalCountWrapper,
  IDataWrapper,
  IAnyDataWrapper,
  IIpWrapper,
  IClearValueWrapper,
  IMessagesWrapper,
  INameWrapper,
  IChannelWrapper,
  IDirtyWrapper,
  IErrorWrapper,
  IKeyValue,
  IProgressWrapper,
  ITouchedWrapper,
  IValidWrapper,
  IEntity,
  IEntityWrapper,
  IFormWrapper,
  EntityIdT,
  INewEntityWrapper,
  IEntityIdWrapper,
  IOriginalEntityWrapper,
  IActiveWrapper,
  IEntityOnClickWrapper,
  ISelectedEntityWrapper,
  IListWrapper,
  IOperationWrapper,
  IEntityIdTWrapper,
  IIsNewWrapper,
  IMergerWrapper,
  IOnBeforeSubmitWrapper,
  IQueryWrapper,
  IFilterWrapper,
  IChangesWrapper,
  IOnClickWrapper,
  ISetFocusWrapper,
  IValueWrapper,
  IOnChangeWrapper,
  ISelectedWrapper,
  IStringProgressMessageWrapper,
  IOnSubmitWrapper,
  IFieldsWrapper,
  IDefaultOnValidWrapper,
  IOnLoadDictionaryWrapper,
  IOnResetWrapper,
  IReadyWrapper,
  IAuthorizedWrapper,
  IApplicationWrapper,
  IStringIdWrapper,
  IApiEntityWrapper,
  IEditApiWrapper,
  IAddApiWrapper,
  IOnChangeManuallyWrapper,
  IExtraParamsWrapper,
  ITransportWrapper,
  IQueueWrapper,
  IStringTokenWrapper,
  IBrowserLocationWrapper,
  IKeyValueRouteParamsWrapper,
  IURLSearchQueryParamsWrapper,
  ILinkedToSectionsWrapper,
  ISectionWrapper,
  ILockWrapper,
  INeedToDestroySectionsWrapper,
  IStackWrapper,
  ILayoutWrapper,
  IModeWrapper,
  IUserWrapper,
  IEmailWrapper,
  ILoginWrapper,
  IPasswordWrapper,
  IRootWrapper,
  IPathWrapper,
  INotificationWrapper,
  IInfoWrapper,
  IStringErrorMessageWrapper,
  ISelfWrapper,
  IStateWrapper,
  IDisabledWrapper,
  IDictionariesWrapper,
  ILoadingWrapper,
  IUrlWrapper,
  ILockPageWrapper,
  IIconWrapper,
  ILabelWrapper,
  IOriginalValueWrapper,
  ISorterWrapper,
  IConnectedWrapper,
  IMutatedListWrapper,
  IOriginalDataWrapper,
  IResetErrorWrapper,
  ICustomErrorWrapper,
  IDirectionsWrapper,
  IDirectionWrapper,
  IFilterFormWrapper,
  IDateWrapper,
  ITimeWrapper,
  AnyT,
  IDisplayValueWrapper,
  IIdWrapper,
  ICountryWrapper,
  IRegionWrapper,
  ICityWrapper,
  IStreetWrapper,
  IStreetNumberWrapper,
  IZipCodeWrapper,
  IAreaWrapper,
  IYWrapper,
  IXWrapper,
  IPayloadWrapper,
  IActiveValueWrapper,
  ITabPanelWrapper,
  IWidthWrapper,
  ITextAlignWrapper,
  IExpandedGroupsWrapper,
  IRawDataWrapper,
} from './definitions.interface';
import {
  IComponentProps,
  IContainerProps,
  IUniversalComponentProps,
  IUniversalContainerProps,
  IUniversalFieldProps,
} from './props-definitions.interface';
import { IUniversalKeyboardHandlersConfiguration } from './configurations-definitions.interface';

/**
 * @stable [29.07.2018]
 */
export interface IPlaceEntity extends ICountryWrapper,
                                      IRegionWrapper,
                                      IAreaWrapper,
                                      ICityWrapper,
                                      IStreetWrapper,
                                      IStreetNumberWrapper,
                                      IZipCodeWrapper {
}

/**
 * @stable [16.06.2018]
 */
export interface IDateTimeEntity extends IDateWrapper,
                                         ITimeWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IUniversalComponentEntity {
}

/**
 * @stable [17.05.2018]
 */
export interface IComponentEntity extends IUniversalComponentEntity {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalContainerEntity extends IChannelWrapperEntity,
                                                   ILayoutWrapperEntity,
                                                   IUserWrapperEntity,
                                                   INotificationWrapperEntity,
                                                   ITransportWrapperEntity {
}

/**
 * @stable [17.05.2018]
 */
export interface IWebContainerEntity extends IRootWrapperEntity,
                                             IStackWrapperEntity,
                                             IBrowserLocationWrapper,
                                             IURLSearchQueryParamsWrapper,
                                             IKeyValueRouteParamsWrapper {
}

/**
 * @stable [17.05.2018]
 */
export interface IContainerEntity extends IUniversalContainerEntity,
                                          IWebContainerEntity {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalComponentPlugin<TProps = {}, TState = {}> extends ComponentLifecycle<TProps, TState> {
}

/**
 * @stable [17.05.2018]
 */
export type UniversalComponentPluginFactoryT = (component: IUniversalComponent) => IUniversalComponentPlugin;

/**
 * @stable [23.04.2018]
 */
export interface IUniversalComponentClassEntity<TProps extends IUniversalComponentProps = IUniversalComponentProps, TState = {}>
  extends ComponentClass<TProps> {
}

/**
 * @stable [14.05.2018]
 */
export interface IUniversalContainerClassEntity<TProps extends IUniversalContainerProps = IUniversalContainerProps, TState = {}>
  extends ComponentClass<TProps> {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalComponentPluginClassEntity<TComponent extends IUniversalComponent<TProps, TState>
                                                          = IUniversalComponent<TProps, TState>,
                                                      TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                                      TState = {}> {
  new(component: TComponent): IUniversalComponentPlugin<TProps, TState>;
}

/**
 * @stable [17.05.2018]
 */
export interface IComponentClassEntity<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IUniversalComponentClassEntity<TProps, TState> {
}

/**
 * @stable [17.05.2018]
 */
export interface IContainerClassEntity<TProps extends IContainerProps = IContainerProps, TState = {}>
  extends IUniversalContainerClassEntity<TProps, TState> {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps, TState = {}>
  extends Component<TProps, TState>,
          ISelfWrapper {
}

/**
 * @stable [17.05.2018]
 */
export interface IComponent<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IUniversalComponent<TProps, TState> {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalContainer<TProps extends IUniversalContainerProps = IUniversalContainerProps, TState = {}>
  extends Component<TProps, TState> {
}

/**
 * @stable [17.05.2018]
 */
export interface IContainer<TProps extends IContainerProps = IContainerProps, TState = {}>
  extends IUniversalContainer<TProps, TState> {
}

/**
 * @stable [18.06.2018]
 */
export type IUniversalFieldDisplayValueConverter<TValue = AnyT> = (value: TValue, scope?: IUniversalField) => string;

/**
 * @stable [18.06.2018]
 */
export interface IUniversalFieldDisplayValueWrapper<TValue = AnyT>
  extends IDisplayValueWrapper<string | IUniversalFieldDisplayValueConverter<TValue>> {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalFieldEntity extends IUniversalComponentEntity,
                                               IValueWrapper,
                                               IOriginalValueWrapper,
                                               IUniversalFieldDisplayValueWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IFieldEntity extends IUniversalFieldEntity {
}

/**
 * @stable [18.06.2018]
 */
export interface IUniversalField<TProps extends IUniversalFieldProps<TKeyboardEvent, TFocusEvent>
                                    = IUniversalFieldProps<TKeyboardEvent, TFocusEvent>,
                                 TState = {},
                                 TKeyboardEvent = AnyT,
                                 TFocusEvent = AnyT>
  extends IUniversalComponent<TProps, TState>,
          IUniversalKeyboardHandlersConfiguration<TKeyboardEvent>,
          IValueWrapper,
          ISetFocusWrapper,
          IClearValueWrapper,
          IResetErrorWrapper,
          IOnChangeWrapper,
          IOnChangeManuallyWrapper {
}

/**
 * @stable [13.05.2018]
 */
export interface INamedEntity extends IEntityIdTWrapper,
                                      INameWrapper {
}

/**
 * @stable [31.08.2018]
 */
export interface IOptionEntity extends IEntityIdTWrapper,
                                       INameWrapper,
                                       IDisabledWrapper {
}

/**
 * @stable [03.07.2018]
 */
export interface INamedNumericEntity extends IIdWrapper,
                                             INameWrapper {
}

/**
 * @stable [01.06.2018]
 */
export interface IFieldChangeEntity extends INameWrapper,
                                            IValueWrapper,
                                            IRawDataWrapper {
}

/**
 * @stable [01.06.2018]
 */
export interface IFieldsChangesEntity extends IFieldsWrapper<IFieldChangeEntity[]> {
}

/**
 * @stable [01.06.2018]
 */
export type FieldChangeEntityT = IFieldChangeEntity | IFieldsChangesEntity;

/**
 * @stable [29.05.2018]
 */
export interface IUniversalLivingEntity extends ITouchedWrapper,
                                                IProgressWrapper,
                                                IErrorEntity<AnyT> {
}

/**
 * @stable [09.05.2018]
 */
export interface IPagedEntity extends IPageWrapper,
                                      IPageSizeWrapper {
}

/**
 * @stable [09.05.2018]
 */
export interface IPaginatedEntity extends IPagedEntity,
                                          ILockPageWrapper,
                                          ITotalCountWrapper,
                                          ITotalAmountWrapper {
}

/**
 * @stable [20.05.2018]
 */
export interface IChannelMessageEntity extends IIpWrapper,
                                               INameWrapper,
                                               IAnyDataWrapper {
}

/**
 * @stable [20.05.2018]
 */
export interface IChannelEntity extends IMessagesWrapper<IChannelMessageEntity[]>,
                                        IConnectedWrapper {
}

/**
 * @stable [20.05.2018]
 */
export interface IChannelsEntity {
  [ip: string]: IChannelEntity;
}

/**
 * @stable [20.05.2018]
 */
export interface IChannelWrapperEntity extends IChannelWrapper<IChannelsEntity> {
}

/**
 * @stable [29.05.2018]
 */
export interface IErrorEntity<TError = boolean, TCustomError = boolean> extends IErrorWrapper<TError>,
                                                                                ICustomErrorWrapper<TCustomError> {
}

/**
 * @stable [29.05.2018]
 */
export interface IStringErrorEntity extends IErrorEntity<string> {
}

/**
 * @stable [29.05.2018]
 */
export interface IEntityWrapperEntity<TEntity extends IEntity> extends IEntityWrapper<TEntity>,
                                                                       INewEntityWrapper,
                                                                       IOriginalEntityWrapper<TEntity>,
                                                                       IEntityIdWrapper<EntityIdT> {
}

/**
 * @stable [29.05.2018]
 */
export interface IEditableEntity<TChanges extends IKeyValue = IEntity> extends IUniversalLivingEntity,
                                                                               IChangesWrapper<TChanges>,
                                                                               IDirtyWrapper,
                                                                               IValidWrapper,
                                                                               IActiveValueWrapper {
}

/**
 * @stable [14.06.2018]
 */
export interface IEditableEntityFormWrapperEntity extends IFormWrapper<IEditableEntity> {
}

/**
 * @stable [29.05.2018]
 */
export interface IBasicFormWrapperEntity<TEntity extends IEntity = IEntity>
  extends IFormWrapper<IEditableEntity<TEntity>>,
          IEntityWrapperEntity<TEntity>,
          IOnBeforeSubmitWrapper<(apiEntity: IApiEntity<TEntity>) => boolean> {
}

/* @stable - 09.04.2018 */
export interface IFormWrapperEntity<TEntity extends IEntity = IEntity>
  extends IBasicFormWrapperEntity<TEntity>,
          IOnResetWrapper,
          IOnChangeWrapper<IFieldChangeEntity>,
          IOnSubmitWrapper<(payload: IApiEntity<TEntity>) => void>,
          IOnLoadDictionaryWrapper,
          IDefaultOnValidWrapper {
}

/**
 * @stable [29.05.2018]
 */
export interface IUniversalListEntity extends IUniversalComponentEntity,
                                              IUniversalLivingEntity,
                                              IPaginatedEntity,
                                              IDataWrapper,
                                              IRawDataWrapper,
                                              IOriginalDataWrapper,
                                              ISelectedEntityWrapper {
}

/* @stable [24.04.2018] */
export interface IUniversalListItemEntity extends IUniversalComponentEntity,
                                                  IRawDataWrapper,
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

/**
 * @stable [29.05.2018]
 */
export interface IRnListEntity extends IUniversalListEntity {
}

/**
 * @stable [29.05.2018]
 */
export interface IListEntity extends IUniversalListEntity,
                                     ISortDirectionsEntity,
                                     IChangesWrapper {
}

/**
 * @stable [30.08.2018]
 */
export interface ITabPanelEntity extends IUniversalComponentEntity,
                                         IActiveValueWrapper {
}

/**
 * @stable [30.08.2018]
 */
export interface ITabPanelWrapperEntity extends ITabPanelWrapper<ITabPanelEntity> {
}

/**
 * @stable [16.05.2018]
 */
export interface IListWrapperEntity extends IListWrapper<IListEntity> {
}

/**
 * @stable [16.05.2018]
 */
export interface IMutatedListWrapperEntity extends IMutatedListWrapper<IListEntity> {
}

/* @stable - 01.04.2018 */
export interface IApiEntity<TEntity extends IEntity = IEntity> extends IEntityWrapperEntity<TEntity>,
                                                                       IEntityIdTWrapper,
                                                                       IChangesWrapper<TEntity>,
                                                                       IMergerWrapper<TEntity>,
                                                                       IOperationWrapper,
                                                                       IIsNewWrapper {
}

/* @stable - 12.04.2018 */
export interface IEditableApiEntity<TEntity extends IEntity> extends IApiEntityWrapper<IApiEntity<TEntity>>,
                                                                     IExtraParamsWrapper<IKeyValue>,
                                                                     IEditApiWrapper,
                                                                     IAddApiWrapper {
}

/**
 * @stable [14.05.2018]
 */
export interface IQueryFilterEntity extends IActiveWrapper,
                                            IQueryWrapper {
}

/**
 * @stable [14.05.2018]
 */
export interface IQueryFilterWrapperEntity extends IFilterWrapper<IQueryFilterEntity> {
}

/* @stable - 01.04.2018 */
export interface IQueryFilteredListEntity extends IListAndFilterWrapperEntity<IQueryFilterEntity, IListEntity> {
}

/* @stable - 05.04.2018 */
export interface IGridEntity extends IListEntity,
                                     IFieldChangeEntity {
}

/* @stable - 04.04.2018 */
export interface IGridWrapperEntity extends IListWrapper<IGridEntity> {
}

/**
 * @stable [15.05.2018]
 */
export interface IGridHeaderColumnEntity extends IComponentEntity,
                                                 ISortDirectionEntity {
}

/* @stable - 05.04.2018 */
export interface IGridRowEntity extends IComponentEntity,
                                        ISelectedWrapper,
                                        IOnClickWrapper {
}

/* @stable - 19.04.2018 */
export interface IUniversalButtonEntity extends IUniversalComponentEntity,
                                                IProgressWrapper,
                                                IDisabledWrapper,
                                                IStringProgressMessageWrapper,
                                                IStringErrorMessageWrapper,
                                                IErrorEntity {
}

/* @stable [23.04.2018] */
export interface IUniversalMessageEntity extends IUniversalComponentEntity,
                                                 IUniversalLivingEntity {
}

/* @stable - 08.04.2018 */
export interface IProgressLabelEntity extends IStringProgressMessageWrapper {
}

/**
 * @stable [23.06.2018]
 */
export interface IUniversalApplicationEntity extends IUniversalContainerEntity,
                                                     IUniversalLivingEntity,
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

/**
 * @stable [13.08.2018]
 */
export interface IOperationEntity extends IStringIdWrapper {
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
export interface IStackItemEntity extends ISectionWrapper,
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

/**
 * @stable [23.09.2018]
 */
export enum LayoutModeEnum {
  FULL,
  MINIMAL,
}

/**
 * @stable [23.09.2018]
 */
export interface ILayoutEntity extends IExpandedGroupsWrapper,
                                       IModeWrapper<LayoutModeEnum>,
                                       IXYEntity {
}

/**
 * @stable [11.08.2018]
 */
export interface ILayoutWrapperEntity extends ILayoutWrapper<ILayoutEntity> {
}

/**
 * @stable [13.05.2018]
 */
export interface IUserEntity extends INamedEntity,
                                     IUrlWrapper,
                                     IPasswordWrapper,
                                     ILoginWrapper,
                                     IEmailWrapper {
}

/* @stable - 15.04.2018 */
export interface IUserWrapperEntity extends IUserWrapper<IUserEntity> {
}

/* @stable - 15.04.2018 */
export interface IRootEntity extends IPathWrapper {
}

/* @stable - 15.04.2018 */
export interface IRootWrapperEntity extends IRootWrapper<IRootEntity> {
}

/* @stable - 15.04.2018 */
export interface INotificationEntity extends IStringErrorEntity,
                                             IInfoWrapper {
}

/* @stable - 15.04.2018 */
export interface INotificationWrapperEntity extends INotificationWrapper<INotificationEntity> {
}

/* @stable - 15.04.2018 */
export interface INavigateEntity<TPath, TState = {}> extends IPathWrapper<TPath>,
                                                             IStateWrapper<TState> {
}

/**
 * @stable [16.06.2018]
 */
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

/**
 * @stable [13.10.2018]
 */
export interface ILabeledValueEntity<TValue = AnyT> extends IValueWrapper<TValue>,
                                                            ILabelWrapper {
}

/**
 * @stable [05.06.2018]
 */
export interface IMenuItemEntity<TRawData extends IEntity = IEntity, TValue = EntityIdT> extends ILabeledValueEntity<TValue>,
                                                                                                 IIconWrapper,
                                                                                                 IDisabledWrapper,
                                                                                                 IRawDataWrapper<TRawData> {
}

/**
 * @stable [05.06.2018]
 */
export interface ISelectOptionEntity<TRawData extends INamedEntity = INamedEntity> extends IMenuItemEntity<TRawData> {
}

/**
 * @stable [14.05.2018]
 */
export interface IStringMenuActionEntity extends IMenuItemEntity<IEntity, string> {
}

/**
 * @stable [16.05.2018]
 */
export interface IDataMutatorEntity<TEntity = IEntity> extends IFilterWrapper<(entity: TEntity) => boolean>,
                                                               ISorterWrapper<(entity1: TEntity, entity2: TEntity) => number> {
}

/**
 * @stable [29.05.2018]
 */
export enum SortDirectionEnum {
  ASC,
  DESC,
}

/**
 * @stable [29.05.2018]
 */
export interface ISortDirectionEntity extends INameWrapper,
                                              IDirectionWrapper<SortDirectionEnum> {
}

/**
 * @stable [29.05.2018]
 */
export interface ISortDirectionsEntity extends IDirectionsWrapper<{ [name: string]: SortDirectionEnum }> {
}

/**
 * @stable [29.05.2018]
 */
export interface IFilterFormWrapperEntity extends IFilterFormWrapper<IEditableEntity> {
}

/**
 * @stable [29.05.2018]
 */
export interface IListAndFilterFormWrapperEntity extends IListWrapperEntity,
                                                         IFilterFormWrapperEntity {
}

/**
 * @stable [04.06.2018]
 */
export interface IListAndFilterWrapperEntity<TFilter, TList> extends IListWrapper<TList>,
                                                                     IFilterWrapper<TFilter> {
}

/**
 * @stable [10.08.2018]
 */
export interface IXYEntity extends IXWrapper,
                                   IYWrapper {
}

/**
 * @stable [13.08.2018]
 */
export interface IOperationPayloadEntity<TPayload> extends IPayloadWrapper<TPayload>,
                                                           IOperationWrapper<IOperationEntity> {
}

/**
 * @stable [10.09.2018]
 */
export interface IStyleEntity extends ITextAlignWrapper,
                                      IWidthWrapper {
}

/**
 * @stable [10.09.2018]
 */
export interface IGridColumnEntity extends IComponentEntity,
                                           IEntityWrapper<IEntity> {
}

/**
 * @stable [12.09.2018]
 */
export interface IEnvironmentPlatformOsEntity {
  architecture?: number;
  family?: string;
  version?: string;
}

/**
 * @stable [12.09.2018]
 */
export interface IEnvironmentEntity {
  appVersion?: string;
  appProfile?: string;
  appNamespace?: string;
  prodMode?: boolean;
  devModeEnabled?: boolean;
  basePath?: string;
  normalizedBasePath?: string;
  port?: string;
  googleKey?: string;
  googleMapsKey?: string;
  rnPlatformName?: string;
  rnPlatform?: boolean;
  macPlatform?: boolean;
  iosPlatform?: boolean;
  platformName?: string;
  platformOs?: IEnvironmentPlatformOsEntity;
  safariPlatform?: boolean;
  passwordInputPlaceholder?: string;
}
