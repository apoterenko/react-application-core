import {
  IClearValueWrapper,
  IDateWrapper,
  IFromDateFromTimeEntity,
  IGetValueWrapper,
  IIdWrapper,
  IKeyValue,
  INameWrapper,
  IOnChangeManuallyWrapper,
  ISetFocusWrapper,
  ITimeWrapper,
  IToDateToTimeEntity,
  IValueWrapper,
} from './definitions.interface';
import { IUniversalFieldProps } from './configurations-definitions.interface';
import {
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
