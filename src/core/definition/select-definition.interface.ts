import { INamedEntity } from './entity-definition.interface';
import { IMenuItemEntity } from './menu-definition.interface';
import {
  IDisabledWrapper,
  IEntityIdTWrapper,
  INameWrapper,
} from '../definitions.interface';

/**
 * @stable [11.10.2019]
 */
export interface IOptionEntity
  extends IEntityIdTWrapper,
    INameWrapper,
    IDisabledWrapper {
}

/**
 * @stable [02.10.2019]
 */
export interface ISelectOptionEntity<TRawData extends INamedEntity = INamedEntity>
  extends IMenuItemEntity<TRawData> {
}
