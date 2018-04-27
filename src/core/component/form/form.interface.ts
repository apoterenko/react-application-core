import { IEntity, IDefaultSubmitWrapper } from '../../definitions.interface';
import {
  IBaseFormWrapperEntity,
  IDefaultFormWrapperEntity,
  IDefaultApiEntity,
  IComponent,
  IContainer,
} from '../../entities-definitions.interface';
import { IFormConfigurationWrapper, IFormConfiguration } from '../../configurations-definitions.interface';
import { ISubmitWrapper, IApiEntityWrapper } from '../../definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';

/* @stable - 10.04.2018 */
export interface IFormInternalProps extends IFormConfiguration,
                                            IDefaultFormWrapperEntity {
}

/* @stable - 01.04.2018 */
export interface IFormContainerInternalProps<TEntity extends IEntity> extends IContainerProps,
                                                                              IFormConfigurationWrapper,
                                                                              IBaseFormWrapperEntity<TEntity> {
}

/* @stable - 01.04.2018 */
export interface IDefaultFormContainerInternalProps extends IFormContainerInternalProps<IEntity> {
}

/* @stable - 11.04.2018 */
export interface IForm extends IComponent<IFormInternalProps, {}>,
                               IApiEntityWrapper<IDefaultApiEntity>,
                               ISubmitWrapper<(apiEntity: IDefaultApiEntity) => void> {
}

/* @stable - 01.04.2018 */
export interface IFormContainer extends IContainer<IDefaultFormContainerInternalProps, {}>,
                                        IDefaultSubmitWrapper {
}
