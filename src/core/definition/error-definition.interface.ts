import { ICustomErrorWrapper, IErrorWrapper } from '../definitions.interface';

/**
 * @stable [07.10.2019]
 */
export enum ErrorEventCategoriesEnum {
  REACT_ERROR = 'react:error',
  WINDOW_ERROR = 'window:error',
}

/**
 * @stable [04.02.2019]
 */
export interface IErrorEntity<TError = boolean, TCustomError = boolean>
  extends IErrorWrapper<TError>,
    ICustomErrorWrapper<TCustomError> {
}
