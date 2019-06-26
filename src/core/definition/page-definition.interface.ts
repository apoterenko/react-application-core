import {
  ILockPageWrapper,
  IPageSizeWrapper,
  IPageWrapper,
  ITotalAmountWrapper,
  ITotalCountWrapper,
} from '../definitions.interface';

/**
 * @stable [25.06.2019]
 */
export interface IPagedEntity
  extends IPageWrapper,
    IPageSizeWrapper {
}

/**
 * @stable [25.06.2019]
 */
export interface IPaginatedEntity
  extends IPagedEntity,
    ILockPageWrapper,
    ITotalCountWrapper,
    ITotalAmountWrapper {
}
