import { IButtonConfiguration, IRnButtonConfiguration } from '../../configurations-definitions.interface';
import { IUniversalButtonEntity } from '../../definition';

/* @stable - 19.04.2018 */
export interface IButtonProps extends IButtonConfiguration,
                                      IUniversalButtonEntity {
  iconCls?: string; // TODO
}

/* @stable - 19.04.2018 */
export interface IRnButtonProps extends IUniversalButtonEntity,
                                        IRnButtonConfiguration {
}
