import { IBaseComponentInternalProps } from '../../base';
import { IGridHeaderColumnConfiguration } from '../../../configurations-definitions.interface';
import { IGridHeaderColumnEntity } from '../../../entities-definitions.interface';

/* @stable - 05.04.2018 */
export interface IGridHeaderColumnInternalProps extends IBaseComponentInternalProps,
                                                        IGridHeaderColumnConfiguration,
                                                        IGridHeaderColumnEntity {
}
