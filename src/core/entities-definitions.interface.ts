import { Component, ComponentClass, ComponentLifecycle } from 'react';

import {
  IClearValueWrapper,
  IDateWrapper,
  IEntity,
  IFilterWrapper,
  IFromDateFromTimeEntity,
  IGetValueWrapper,
  IIdWrapper,
  IKeyValue,
  INameWrapper,
  IOnChangeManuallyWrapper,
  ISetFocusWrapper,
  ISorterWrapper,
  ITimeWrapper,
  IToDateToTimeEntity,
  IValueWrapper,
} from './definitions.interface';
import { IUniversalKeyboardHandlersConfiguration, IUniversalFieldProps } from './configurations-definitions.interface';
import {
  IEnvironment,
  IGenericComponent,
} from './definition';

/**
 * @stable [16.06.2018]
 */
export interface IDateTimeEntity extends IDateWrapper,
                                         ITimeWrapper {
}

/**
 * @stable [18.06.2018]
 */
export interface IGenericField2<TProps extends IUniversalFieldProps = IUniversalFieldProps,
                                 TState = {}>
  extends IGenericComponent<TProps, TState>,
          IUniversalKeyboardHandlersConfiguration,
          IValueWrapper,
          ISetFocusWrapper,
          IClearValueWrapper,
          IOnChangeManuallyWrapper {
}

/**
 * @stable [03.07.2018]
 */
export interface INamedNumericEntity extends IIdWrapper,
                                             INameWrapper {
}

/**
 * @stable [16.05.2018]
 */
export interface IDataMutatorEntity<TEntity = IEntity> extends IFilterWrapper<(entity: TEntity) => boolean>,
                                                               ISorterWrapper<(entity1: TEntity, entity2: TEntity) => number> {
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
 * TODO
 * @deprecated
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
 * TODO
 * @deprecated
 */
export interface ICrossPlatformField extends IOnChangeManuallyWrapper,
                                             IGetValueWrapper,
                                             IValueWrapper {
}
