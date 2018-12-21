import {
  IOptionsWrapper,
  IWidthWrapper,
  IUseLocalizationWrapper,
  ITplFnWrapper,
} from '../../definitions.interface';
import { IMenuItemEntity } from '../../entities-definitions.interface';
import { IVueComponent } from '../../vue-entities-definitions.interface';

/**
 * @stable [17.11.2018]
 */
export interface IVueMenuContextEntity extends IWidthWrapper {
}

/**
 * @stable [21.12.2018]
 */
export interface IVueMenuProps extends IOptionsWrapper<IMenuItemEntity[]>,
                                       IUseLocalizationWrapper,
                                       ITplFnWrapper<IMenuItemEntity> {
}

/**
 * @stable [17.11.2018]
 */
export interface IVueMenu extends IVueComponent {
  show(context?: IVueMenuContextEntity): void;
}
