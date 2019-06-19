import {
  IOpenWrapper,
  IShowWrapper,
  IFilterWrapper,
  IOptionsWrapper,
  IOpenedWrapper,
  ICenteredMenuWrapper,
  IHideWrapper,
  IIsOpenWrapper,
} from '../../definitions.interface';
import { IComponent, IMenuItemEntity, INativeMaterialComponent } from '../../entities-definitions.interface';
import { IMenuConfiguration } from '../../configurations-definitions.interface';

/**
 * @stable [07.06.2018]
 */
export interface IMenuState extends IFilterWrapper,
                                    IOpenedWrapper {
}

/**
 * @stable [31.07.2018]
 */
export interface IMenuEntity extends IOptionsWrapper<IMenuItemEntity[]> {
}

/**
 * @stable [31.07.2018]
 */
export interface IMenuProps extends IMenuConfiguration,
                                    IMenuEntity {
}

export interface INativeMaterialMenuComponent
  extends INativeMaterialComponent,
    IOpenWrapper,
    IShowWrapper<() => void> {
  hoistMenuToBody();
}

/**
 * @stable [18.06.2019]
 */
export interface IMenu
  extends IComponent<IMenuProps, IMenuState>,
    IShowWrapper<() => void>,
    IIsOpenWrapper<() => boolean>,
    ICenteredMenuWrapper,
    IHideWrapper<() => void> {
}
