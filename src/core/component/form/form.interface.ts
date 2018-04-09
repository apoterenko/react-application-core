import { IEntity, IDefaultSubmitWrapper } from '../../definitions.interface';
import {
  IBaseComponent,
  IBaseComponentInternalProps,
  IBaseContainer,
  IBaseContainerInternalProps,
} from '../base';
import { IFormWrapperEntity, IDefaultFormWrapperEntity } from '../../entities-definitions.interface';
import { IFormConfigurationWrapper, IFormConfiguration } from '../../configurations-definitions.interface';

/* @stable - 10.04.2018 */
export interface IFormInternalProps extends IBaseComponentInternalProps,
                                            IFormConfiguration,
                                            IDefaultFormWrapperEntity {
}

/* @stable - 01.04.2018 */
export interface IFormContainerInternalProps<TEntity extends IEntity> extends IBaseContainerInternalProps,
                                                                              IFormConfigurationWrapper,
                                                                              IFormWrapperEntity<TEntity> {
}

/* @stable - 01.04.2018 */
export interface IDefaultFormContainerInternalProps extends IFormContainerInternalProps<IEntity> {
}

/* @stable - 01.04.2018 */
export interface IForm extends IBaseComponent<IFormInternalProps, {}>,
                               IDefaultSubmitWrapper {
}

/* @stable - 01.04.2018 */
export interface IFormContainer extends IBaseContainer<IDefaultFormContainerInternalProps, {}>,
                                        IDefaultSubmitWrapper {
}
