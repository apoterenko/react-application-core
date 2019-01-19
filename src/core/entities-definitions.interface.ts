import { Component, ComponentClass, ComponentLifecycle } from 'react';
import { History } from 'history';

import {
  AnyT,
  EntityIdT,
  IActiveValueWrapper,
  IActiveWrapper,
  IAddApiWrapper,
  IAnyDataWrapper,
  IApiEntityWrapper,
  IApplicationWrapper,
  IAreaWrapper,
  IAuthorizedWrapper,
  IBrowserLocationWrapper,
  IChangesWrapper,
  IChannelWrapper,
  ICityWrapper,
  IClearValueWrapper,
  IConnectedWrapper,
  ICountryWrapper,
  ICustomErrorWrapper,
  IDataWrapper,
  IDateWrapper,
  IDefaultOnValidWrapper,
  IDictionariesWrapper,
  IDirectionsWrapper,
  IDirectionWrapper,
  IDirtyWrapper,
  IDisabledWrapper,
  IDispatchFormChangesWrapper,
  IDispatchFormChangeWrapper,
  IDispatchLoadDictionaryWrapper,
  IDispatchWrapper,
  IDisplayValueWrapper,
  IEditApiWrapper,
  IEmailWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityIdWrapper,
  IEntityWrapper,
  IErrorWrapper,
  IExpandedGroupsWrapper,
  IExtraParamsWrapper,
  IFieldsWrapper,
  IFilterFormWrapper,
  IFilterWrapper,
  IFormWrapper,
  IFromDateFromTimeEntity,
  IGetSelfWrapper,
  IGetValueWrapper,
  IIconWrapper,
  IIdWrapper,
  IInfoWrapper,
  IIpWrapper,
  IIsNewWrapper,
  IJQueryElement,
  IKeyValue,
  IKeyValueRouteParamsWrapper,
  ILabelWrapper,
  ILayoutWrapper,
  ILinkedToSectionsWrapper,
  IListWrapper,
  ILoadingWrapper,
  ILockPageWrapper,
  ILockWrapper,
  ILoginWrapper,
  IMergerWrapper,
  IMessagesWrapper,
  IMiniWrapper,
  IModeWrapper,
  IMutatedListWrapper,
  INameWrapper,
  INeedToDestroySectionsWrapper,
  INewEntityWrapper,
  INotificationWrapper,
  IOnBeforeSubmitWrapper,
  IOnChangeManuallyWrapper,
  IOnChangeWrapper,
  IOnLoadDictionaryWrapper,
  IOnResetWrapper,
  IOnScrollWrapper,
  IOnSubmitWrapper,
  IOpenWrapper,
  IOperationWrapper,
  IOriginalDataWrapper,
  IOriginalEntityWrapper,
  IOriginalValueWrapper,
  IPageSizeWrapper,
  IPageWrapper,
  IPasswordWrapper,
  IPathWrapper,
  IPayloadWrapper,
  IPhotoUrlWrapper,
  IProgressWrapper,
  IQueryWrapper,
  IQueueWrapper,
  IRawDataWrapper,
  IReadyWrapper,
  IRegionWrapper,
  IResetErrorWrapper,
  ISectionWrapper,
  ISelectedEntityWrapper,
  ISelectedWrapper,
  ISetFocusWrapper,
  ISorterWrapper,
  IStackWrapper,
  IStateWrapper,
  IStreetNumberWrapper,
  IStreetWrapper,
  IStringErrorMessageWrapper,
  IStringProgressMessageWrapper,
  IStringTokenWrapper,
  ITabPanelWrapper,
  ITextAlignWrapper,
  ITimeWrapper,
  IToDateToTimeEntity,
  ITotalAmountWrapper,
  ITotalCountWrapper,
  ITouchedWrapper,
  ITransportWrapper,
  IURLSearchQueryParamsWrapper,
  IUrlWrapper,
  IUserWrapper,
  IValidWrapper,
  IValueWrapper,
  IWidthWrapper,
  IXWrapper,
  IYWrapper,
  ITypeWrapper,
  IZipCodeWrapper,
  IBlobWrapper,
  IDispatchCustomTypeWrapper,
} from './definitions.interface';
import {
  IComponentProps,
  IContainerProps,
  IUniversalComponentProps,
  IUniversalContainerProps,
  IUniversalFieldProps,
} from './props-definitions.interface';
import { IUniversalKeyboardHandlersConfiguration } from './configurations-definitions.interface';
import { IOnClickWrapper } from './react-definitions.interface';

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
export interface IUniversalComponentEntity extends IXYEntity {
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
export interface IWebContainerEntity extends IStackWrapperEntity,
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
          IGetSelfWrapper {
}

/**
 * @stable [13.12.2018]
 */
export interface IUniversalScrollableComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                               TState = {}>
  extends IUniversalComponent<TProps, TState>,
          IOnScrollWrapper {
}

/**
 * @stable [17.05.2018]
 */
export interface IComponent<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IUniversalComponent<TProps, TState> {
}

/**
 * @stable [18.11.2018]
 */
export interface IDispatchEntity extends IDispatchWrapper,
                                         IDispatchFormChangesWrapper,
                                         IDispatchLoadDictionaryWrapper,
                                         IDispatchFormChangeWrapper,
                                         IDispatchCustomTypeWrapper {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalContainer<TProps extends IUniversalContainerProps = IUniversalContainerProps, TState = {}>
  extends Component<TProps, TState>,
          IDispatchEntity {
}

/**
 * @stable [17.05.2018]
 */
export interface IContainer<TProps extends IContainerProps = IContainerProps, TState = {}>
  extends IUniversalContainer<TProps, TState> {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalFieldEntity extends IUniversalComponentEntity,
                                               IValueWrapper,
                                               IOriginalValueWrapper,
                                               IDisplayValueWrapper<string | ((value: AnyT) => string)> {
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
 * @stable [13.12.2018]
 */
export interface IChannelsEntity extends Record<string, IChannelEntity> {
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
 * @stable [19.01.2019]
 */
export interface IEntityFormEntity<TEntity extends IEntity = IEntity>
  extends IFormWrapper<IEditableEntity<TEntity>>,
          IEntityWrapperEntity<TEntity> {
}

/**
 * @stable [29.05.2018]
 */
export interface IBasicFormWrapperEntity<TEntity extends IEntity = IEntity>
  extends IEntityFormEntity<TEntity>,
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
                                                  IOnClickWrapper<IEntity>,
                                                  ISelectedWrapper {
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
                                                IErrorEntity,
                                                IMiniWrapper {
}

/* @stable [23.04.2018] */
export interface IUniversalMessageEntity extends IUniversalComponentEntity,
                                                 IUniversalLivingEntity {
}

/* @stable - 08.04.2018 */
export interface IProgressLabelEntity extends IStringProgressMessageWrapper {
}

/**
 * @stable [23.10.2018]
 */
export interface IUniversalApplicationEntity extends IUniversalContainerEntity,
                                                     IUniversalLivingEntity,
                                                     IAuthorizedWrapper,
                                                     IReadyWrapper,
                                                     IPathWrapper {
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
export interface IOperationEntity extends IIdWrapper<string> {
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
export interface ILayoutEntity extends IUniversalComponentEntity,
                                       IExpandedGroupsWrapper,
                                       IModeWrapper<LayoutModeEnum> {
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
                                     IPhotoUrlWrapper,
                                     IPasswordWrapper,
                                     ILoginWrapper,
                                     IEmailWrapper {
}

/* @stable - 15.04.2018 */
export interface IUserWrapperEntity extends IUserWrapper<IUserEntity> {
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
                                                                              IStackWrapperEntity,
                                                                              IChannelWrapperEntity,
                                                                              ITransportWrapperEntity,
                                                                              IDictionariesWrapper<TDictionaries> {
}

/* @stable - 23.07.2018 */
export interface IApplicationStoreEntity<TDictionaries = {}> extends IUniversalApplicationStoreEntity<TDictionaries>,
                                                                     ILayoutWrapperEntity,
                                                                     INotificationWrapperEntity {
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
 * @stable [01.07.2018]
 */
export interface IMultiItemEntity extends IEntityIdTWrapper,
                                          IFieldChangeEntity,
                                          INewEntityWrapper {
}

/**
 * @stable [22.12.2018]
 */
export interface IMultiItemFileEntity extends IMultiItemEntity,
                                              ITypeWrapper {
}

/**
 * @stable [22.12.2018]
 */
export type MultiItemEntityT = IMultiItemEntity | EntityIdT;

/**
 * @stable [04.07.2018]
 */
export interface IMultiEntity {
  add: IMultiItemEntity[];
  remove: IMultiItemEntity[];
  edit: IMultiItemEntity[];
  source?: IEntity[];
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
  documentBody?: Element;
  appPath?(): string;
  buildAppPath?(path: string): string;
}

/**
 * @stable [09.11.2018]
 */
export interface IFromDateFromTimeToDateToTimeEntity extends IFromDateFromTimeEntity,
                                                             IToDateToTimeEntity {
}

/**
 * @stable [15.08.2018]
 */
export interface INativeMaterialAdapter extends IKeyValue {
}

/**
 * @stable [05.05.2018]
 */
export interface INativeMaterialFoundation extends IKeyValue {
  adapter_: INativeMaterialAdapter;
}

/**
 * @stable [17.11.2018]
 */
export interface INativeMaterialComponent {
  foundation_: INativeMaterialFoundation;
  destroy();
  unlisten(event: string, callback: () => void);
  listen(event: string, callback: () => void);
}

/**
 * @stable [17.11.2018]
 */
export interface IMenuMaterialComponent extends INativeMaterialComponent,
                                                IOpenWrapper {
  hoistMenuToBody();
}

/**
 * @stable [28.11.2018]
 */
export interface ICrossPlatformField extends IOnChangeManuallyWrapper,
                                             IGetValueWrapper,
                                             IValueWrapper {
}

/**
 * @stable [13.12.2018]
 */
export interface IStickyElementPayloadEntity {
  jqSelfEl?: IJQueryElement;
  jqStickyNeighborRightEl?: IJQueryElement;
  jqStickyEl?: IJQueryElement;
  jqStickyElHeight?: number;
  initialStickyElTop?: number;
}

/**
 * @stable [17.12.2018]
 */
export interface IBlobEntity extends IIdWrapper<string>,
                                     IBlobWrapper {
}
