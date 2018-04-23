import { IBaseComponent } from '../../base';
import { IListItemConfiguration } from '../../../configurations-definitions.interface';
import { IListItemEntity } from '../../../entities-definitions.interface';

/* @stable - 31.03.2018 */
export interface IListItemProps extends IListItemConfiguration,
                                        IListItemEntity {
}

/* @stable - 31.03.2018 */
export interface IListItem extends IBaseComponent<IListItemProps, {}> {
}
