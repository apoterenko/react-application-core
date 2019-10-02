import { INamedEntity } from './entity-definition.interface';
import { IMenuItemEntity } from './menu-definition.interface';

/**
 * @stable [02.10.2019]
 */
export interface ISelectOptionEntity<TRawData extends INamedEntity = INamedEntity>
  extends IMenuItemEntity<TRawData> {
}
