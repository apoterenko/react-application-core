import { IMenuItemEntity } from './menu-definition.interface';
import {
  IDisabledWrapper,
  IEntityIdTWrapper,
  IKeyValue,
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
export interface ISelectOptionEntity<TRawData = IKeyValue>
  extends IMenuItemEntity<TRawData> {
}
