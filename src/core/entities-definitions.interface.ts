import { Component, ComponentClass, ComponentLifecycle } from 'react';

import {
  AnyT,
  IClearValueWrapper,
  IDateWrapper,
  IDisplayValueWrapper,
  IEntity,
  IFilterWrapper,
  IFromDateFromTimeEntity,
  IGetValueWrapper,
  IIdWrapper,
  IIndexWrapper,
  IKeyValue,
  IListWrapper,
  INameWrapper,
  IOnChangeManuallyWrapper,
  IOnChangeWrapper,
  IOpenWrapper,
  IOriginalValueWrapper,
  IRawDataWrapper,
  IResetErrorWrapper,
  ISelectedWrapper,
  ISetFocusWrapper,
  ISorterWrapper,
  ITimeWrapper,
  IToDateToTimeEntity,
  IValueWrapper,
} from './definitions.interface';
import {
  IUniversalFieldProps,
} from './props-definitions.interface';
import { IUniversalKeyboardHandlersConfiguration } from './configurations-definitions.interface';
import { IReactOnClickWrapper } from './react-definitions.interface';
import {
  IComponentProps,
  IEnvironment,
  IFieldChangeEntity,
  ILifeCycleEntity,
  IListEntity,
  IQueryFilterEntity,
  IUniversalComponent,
  IUniversalComponentEntity,
} from './definition';

/**
 * @stable [16.06.2018]
 */
export interface IDateTimeEntity extends IDateWrapper,
                                         ITimeWrapper {
}

/**
 * @stable [23.04.2018]
 */
export interface IUniversalComponentCtor<TProps extends IUniversalComponentEntity = IUniversalComponentEntity, TState = {}>
  extends ComponentClass<TProps, TState> {
}

/**
 * @stable [17.05.2018]
 */
export interface IReactComponentClassEntity<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IUniversalComponentCtor<TProps, TState> {
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
 * @stable [03.07.2018]
 */
export interface INamedNumericEntity extends IIdWrapper,
                                             INameWrapper {
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

/* @stable - 05.04.2018 */
export interface IGridRowEntity extends ISelectedWrapper,
                                        IReactOnClickWrapper {
}

/* @stable [23.04.2018] */
export interface IUniversalMessageEntity extends ILifeCycleEntity {
}

/**
 * @stable [16.05.2018]
 */
export interface IDataMutatorEntity<TEntity = IEntity> extends IFilterWrapper<(entity: TEntity) => boolean>,
                                                               ISorterWrapper<(entity1: TEntity, entity2: TEntity) => number> {
}

/**
 * @stable [04.06.2018]
 */
export interface IFilteredListWrapperEntity<TFilter, TList>
  extends IListWrapper<TList>,
    IFilterWrapper<TFilter> {
}

/**
 * @stable [12.09.2018]
 */
export interface IEnvironmentEntity
  extends IEnvironment {
  version?: string;
  devModeEnabled?: boolean;
  documentBody?: Element;
  googleMapsKey?: string;
  normalizedBasePath?: string;
  platformName?: string;
  port?: string;
  stageMode?: boolean;
  rnPlatform?: boolean;
  rnPlatformName?: string;
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
