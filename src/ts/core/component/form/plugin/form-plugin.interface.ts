import { IFormContainer, IFormContainerInternalProps, IFormEntity } from '../form.interface';
import { IBaseContainerInternalState } from '../../base/base.interface';
import { IComponentPlugin } from '../../plugin/component-plugin.interface';

export interface IFormContainerPlugin<TContainer extends IFormContainer<TEntity, IFormContainerInternalProps<TEntity>, IBaseContainerInternalState>,
                                      TEntity extends IFormEntity>
    extends IComponentPlugin<TContainer, IFormContainerInternalProps<TEntity>, IBaseContainerInternalState> {
}
