import { IListItemConfiguration } from '../../../configurations-definitions.interface';
import { IListItemEntity } from '../../../entities-definitions.interface';
import { IComponentProps } from '../../../definition';

/* @stable - 31.03.2018 */
export interface IListItemProps
  extends IComponentProps,
    IListItemConfiguration,
    IListItemEntity {
}
