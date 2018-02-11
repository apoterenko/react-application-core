import { IEntity } from '../../../definition.interface';
import { IBaseContainerInternalState } from '../../base';
import { IFormContainerInternalProps } from '../../form';

export interface IDefaultFilterContainerInternalProps extends IFormContainerInternalProps<IEntity> {
}

export interface IDefaultFilterContainerInternalState extends IBaseContainerInternalState {
}
