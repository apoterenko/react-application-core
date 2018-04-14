import { IBaseContainerInternalProps } from '../../component/base';
import { IApplicationEntity } from '../../entities-definitions.interface';
import { IApplicationConfiguration, IDefaultConnectorConfiguration } from '../../configurations-definitions.interface';

/* @stable - 11.04.2018 */
export interface IApplicationContainerProps extends IBaseContainerInternalProps,
                                                    IApplicationConfiguration,
                                                    IApplicationEntity {
}

export const APPLICATION_SECTIONS = new Map<string, IDefaultConnectorConfiguration>();
