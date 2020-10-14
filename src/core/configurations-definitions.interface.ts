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
} from './definition';

/**
 * @stable [02.08.2018]
 */
export interface IWebCameraConfiguration extends IComponentProps,
                                                 ICameraWidthWrapper,
                                                 ICameraHeightWrapper,
                                                 IOnSelectWrapper<Blob> {
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
