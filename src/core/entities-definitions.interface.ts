import { Component, ComponentClass, ComponentLifecycle } from 'react';
import { History } from 'history';

import {
  AnyT,
  EntityIdT,
  IApplicationWrapper,
  IAuthorizedWrapper,
  IChangesWrapper,
  IClearValueWrapper,
  IDataWrapper,
  IDateWrapper,
  IDefaultOnValidWrapper,
  IDictionariesWrapper,
  IDirectionsWrapper,
  IDirectionWrapper,
  IDisabledWrapper,
  IDisplayValueWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityWrapper,
  IExpandedGroupsWrapper,
  IFieldsWrapper,
  IFilterFormWrapper,
  IFilterWrapper,
  IFromDateFromTimeEntity,
  IGetSelfWrapper,
  IGetValueWrapper,
  IIconWrapper,
  IIdWrapper,
  IIndexWrapper,
  IInfoWrapper,
  IJQueryElement,
  IKeyValue,
  ILabelWrapper,
  ILayoutWrapper,
  IListWrapper,
  ILoadingWrapper,
  ILoginWrapper,
  IModeWrapper,
  INameWrapper,
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
  IOriginalDataWrapper,
  IOriginalValueWrapper,
  IPasswordWrapper,
  IPathWrapper,
  IPhotoUrlWrapper,
  IQueueWrapper,
  IRawDataWrapper,
  IReadyWrapper,
  IResetErrorWrapper,
  ISelectedEntityWrapper,
  ISelectedWrapper,
  ISetFocusWrapper,
  ISorterWrapper,
  IStateWrapper,
  ITextAlignWrapper,
  ITimeWrapper,
  IToDateToTimeEntity,
  ITokenWrapper,
  ITransportWrapper,
  ITypeWrapper,
  IUrlWrapper,
  IUserWrapper,
  IValueWrapper,
  IWidthWrapper,
} from './definitions.interface';
import {
  IComponentProps,
  IContainerProps,
  IUniversalComponentProps,
  IUniversalFieldProps,
} from './props-definitions.interface';
import { IUniversalKeyboardHandlersConfiguration } from './configurations-definitions.interface';
import { IReactOnClickWrapper } from './react-definitions.interface';
import {
  IApiEntity,
  IChannelWrapperEntity,
  IEditableEntity,
  IEntityFormEntity,
  IErrorEntity,
  ILifeCycleEntity,
  IPaginatedEntity,
  IPermissionsWrapperEntity,
  IQueryFilterEntity,
  IStackWrapperEntity,
  IUniversalContainerEntity,
  IUniversalContainerProps,
  IWebContainerEntity,
  IXYEntity,
} from './definition';

/**
 * @stable [16.06.2018]
 */
export interface IDateTimeEntity extends IDateWrapper,
                                         ITimeWrapper {
}

/**
 * @stable [17.05.2018]
 */
export interface IContainerEntity extends IUniversalContainerEntity,
                                          IWebContainerEntity {
}

/**
 * @stable [23.04.2018]
 */
export interface IUniversalComponentCtor<TProps extends IUniversalComponentProps = IUniversalComponentProps, TState = {}>
  extends ComponentClass<TProps, TState> {
}

/**
 * @stable [14.05.2018]
 */
export interface IUniversalContainerClassEntity<TProps extends IUniversalContainerProps = IUniversalContainerProps, TState = {}>
  extends ComponentClass<TProps, TState> {
}

/**
 * @stable [17.05.2018]
 */
export interface IReactComponentClassEntity<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IUniversalComponentCtor<TProps, TState> {
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
 * @stable [20.01.2019]
 */
export interface IDispatchEntity {
  dispatchListCreate?(): void;
  dispatchFormChange?(fieldName: string, fieldValue?: AnyT, otherSection?: string): void;
  dispatchFormSubmit?(): void;
  dispatchFrameworkAction?<TData = IKeyValue>(type: string, data?: TData, otherSection?: string): void;
  dispatchFormChanges?<TChanges extends IKeyValue = IKeyValue>(changes: TChanges, otherSection?: string): void;
  dispatchLoadDictionary?<TData = IKeyValue>(dictionary: string, data?: TData): void;
  dispatchCustomType?<TData = IKeyValue>(type: string, data?: TData): void;
  dispatch?<TChanges = IKeyValue>(type: string, data?: TChanges): void;
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
export interface IUniversalFieldEntity extends IValueWrapper,
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
 * @stable [12.06.2018]
 */
export interface INamedEntity
  extends IEntityIdTWrapper,
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
export interface IBasicFormWrapperEntity<TEntity = IEntity>
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
export interface IUniversalListEntity extends ILifeCycleEntity,
                                              IPaginatedEntity,
                                              IDataWrapper,
                                              IRawDataWrapper,
                                              IOriginalDataWrapper,
                                              ISelectedEntityWrapper {
}

/* @stable [24.04.2018] */
export interface IUniversalListItemEntity extends IRawDataWrapper,
                                                  IIndexWrapper,
                                                  IReactOnClickWrapper<IEntity>,
                                                  ISelectedWrapper {
}

/* @stable [24.04.2018] */
export interface IRnListItemEntity extends IUniversalListItemEntity {
}

/* @stable - 31.03.2018 */
export interface IListItemEntity extends IUniversalListItemEntity {
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
 * @stable [16.05.2018]
 */
export interface IListWrapperEntity extends IListWrapper<IListEntity> {
}

/**
 * @stable [17.09.2019]
 */
export interface IQueryFilteredListEntity
  extends IFilteredListWrapperEntity<IQueryFilterEntity, IListEntity> {
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
export interface IGridHeaderColumnEntity extends ISortDirectionEntity {
}

/* @stable - 05.04.2018 */
export interface IGridRowEntity extends ISelectedWrapper,
                                        IReactOnClickWrapper {
}

/* @stable [23.04.2018] */
export interface IUniversalMessageEntity extends ILifeCycleEntity {
}

/**
 * @stable [23.10.2018]
 */
export interface IUniversalApplicationEntity extends IUniversalContainerEntity,
                                                     ILifeCycleEntity,
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

/* @stable - 12.04.2018 */
export interface ITransportEntity extends ITokenWrapper,
                                          IQueueWrapper<string[]> {
}

/* @stable - 15.04.2018 */
export interface ITransportWrapperEntity extends ITransportWrapper<ITransportEntity> {
}

/* @stable - 15.04.2018 */
export interface IRouterComponentEntity extends History {
}

/**
 * @stable [23.09.2018]
 */
export enum LayoutModeEnum {
  FULL,
  MINIMAL,
}

// TODO
export interface ILayoutEntity extends IXYEntity,
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
                                     ILoginWrapper {
}

/* @stable - 15.04.2018 */
export interface IUserWrapperEntity extends IUserWrapper<IUserEntity> {
}

/* @stable - 15.04.2018 */
export interface INotificationEntity extends IErrorEntity,
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
export interface IUniversalStoreEntity<TDictionaries = {}, TPermissions = {}>
  extends IApplicationWrapperEntity,
    IUserWrapperEntity,
    IStackWrapperEntity,
    IChannelWrapperEntity,
    ITransportWrapperEntity,
    IPermissionsWrapperEntity<TPermissions>,
    IDictionariesWrapper<TDictionaries> {
}

export interface IStoreEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalStoreEntity<TDictionaries, TPermissions>,
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
export interface IFilteredListWrapperEntity<TFilter, TList>
  extends IListWrapper<TList>,
    IFilterWrapper<TFilter> {
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
export interface IGridColumnEntity extends IEntityWrapper<IEntity> {
}

/**
 * @stable [01.07.2018]
 */
export interface IMultiItemEntity
  extends IEntityIdTWrapper,
    IFieldChangeEntity,
    INewEntityWrapper,
    IIndexWrapper {
}

/**
 * @stable [22.12.2018]
 */
export interface IMultiItemFileEntity
  extends IMultiItemEntity,
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
  document?: Document;
  host?: string;
  androidPlatform?: boolean;
  mobilePlatform?: boolean;
  appNamespace?: string;
  appProfile?: string;
  appVersion?: string;
  basePath?: string;
  devModeEnabled?: boolean;
  documentBody?: Element;
  googleKey?: string;
  googleMapsKey?: string;
  iosPlatform?: boolean;
  localModeEnabled?: boolean;
  macPlatform?: boolean;
  normalizedBasePath?: string;
  passwordInputPlaceholder?: string;
  platformName?: string;
  platformOs?: IEnvironmentPlatformOsEntity;
  port?: string;
  prodMode?: boolean;
  stageMode?: boolean;
  rnPlatform?: boolean;
  rnPlatformName?: string;
  safariPlatform?: boolean;
  windowsPhonePlatform?: boolean;
  appPath?(): string;
  buildAppPath?(path: string): string;
  setVariable?(name: string, scope: AnyT): void;
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
  initial?: boolean;
}
