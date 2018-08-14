import { IContainerProps } from '../../../props-definitions.interface';
import { IItemsWrapper } from '../../../definitions.interface';
import { ITabConfiguration } from '../../../configurations-definitions.interface';

/**
 * @stable [14.08.2018]
 */
export interface IFormTabPanelContainerProps extends IContainerProps,
                                                     IItemsWrapper<ITabConfiguration[]> {
}
