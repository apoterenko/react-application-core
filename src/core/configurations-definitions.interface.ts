import {
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  IFieldConfigurationWrapper,
  IFilterFnWrapper,
  IOnSelectWrapper,
  ISorterWrapper,
} from './definitions.interface';
import {
  IComponentProps,
  IFieldProps,
  IGenericFieldEntity,
} from './definition';

/**
 * @stable [02.08.2018]
 */
export interface IWebCameraConfiguration extends IComponentProps,
                                                 ICameraWidthWrapper,
                                                 ICameraHeightWrapper,
                                                 IOnSelectWrapper<Blob> {
}

/* @stable - 11.04.2018 */
export interface IFieldProps2 extends IComponentProps,
  IGenericFieldEntity {
}

export interface IFieldConfigurationEntity<TFieldProps extends IFieldProps = IFieldProps>
  extends IFieldConfigurationWrapper<IFieldProps> {
}

/**
 * @stable [05.06.2018]
 */
export interface IFilterAndSorterConfiguration extends IFilterFnWrapper,
                                                       ISorterWrapper {
}
