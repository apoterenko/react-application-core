import { IBaseComponentInternalProps } from '../base';
import { ITabPanelEntity } from '../../entities-definitions.interface';
import { ITabPanelConfiguration } from '../../configurations-definitions.interface';

/* @stable - 07.04.2018 */
export interface ITabPanelInternalProps extends IBaseComponentInternalProps,
                                                ITabPanelConfiguration,
                                                ITabPanelEntity {
}
