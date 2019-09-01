import { IUniversalMessageConfiguration } from '../../configurations-definitions.interface';
import { IUniversalMessageEntity } from '../../entities-definitions.interface';

/* @stable [23.04.2018] */
export interface IUniversalMessageProps extends IUniversalMessageConfiguration,
                                                IUniversalMessageEntity {
  progressLabelProps?: any; // TODO
}
