import { ICustomErrorWrapper, IErrorWrapper } from '../definitions.interface';

/**
 * @stable [04.02.2019]
 */
export interface IErrorEntity<TError = boolean, TCustomError = boolean>
  extends IErrorWrapper<TError>,
    ICustomErrorWrapper<TCustomError> {
}
