import { IGridHeaderColumnConfiguration } from '../../../configurations-definitions.interface';
import {
  IGridHeaderColumnEntity,
  ISortDirectionEntity,
} from '../../../entities-definitions.interface';

/**
 * @stable [23.04.2018]
 */
export interface IGridHeaderColumnProps extends IGridHeaderColumnConfiguration,
                                                IGridHeaderColumnEntity {
  onSortingDirectionChange?(payload: ISortDirectionEntity): void;
}
