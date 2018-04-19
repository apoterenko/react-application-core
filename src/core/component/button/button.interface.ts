import { IUniversalButtonEntity } from '../../entities-definitions.interface';
import { IButtonConfiguration, IRnButtonConfiguration } from '../../configurations-definitions.interface';

/* @stable - 19.04.2018 */
export interface IButtonProps extends IButtonConfiguration,
                                      IUniversalButtonEntity {
}

/* @stable - 19.04.2018 */
export interface IRnButtonProps extends IRnButtonConfiguration,
                                        IUniversalButtonEntity {
}
