import { IBaseComponentInternalProps, IBaseComponent } from '../../base';
import { IListItemConfiguration } from '../../../configurations-definitions.interface';
import { IListItemEntity } from '../../../entities-definitions.interface';

/* @stable - 31.03.2018 */
export interface IListItemInternalProps extends IBaseComponentInternalProps,
                                                IListItemConfiguration,
                                                IListItemEntity {
}

/* @stable - 31.03.2018 */
export interface IListItem extends IBaseComponent<IListItemInternalProps, {}> {
}
