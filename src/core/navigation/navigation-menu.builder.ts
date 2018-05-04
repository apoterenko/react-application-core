import {
  provideInSingleton,
  lazyInject,
  DI_TYPES,
} from '../di';
import { IPermissionsService } from '../permissions';
import { ApplicationTranslatorT } from '../translation';
import { INavigationListItemConfiguration, NavigationListItemTypeEnum } from '../configurations-definitions.interface';

@provideInSingleton(NavigationMenuBuilder)
export class NavigationMenuBuilder {

  @lazyInject(DI_TYPES.Permission) private permissionService: IPermissionsService;
  @lazyInject(DI_TYPES.Menu) private menu: INavigationListItemConfiguration[];
  @lazyInject(DI_TYPES.Translate) private t: ApplicationTranslatorT;

  public provide(): INavigationListItemConfiguration[] {
    let menuItems: INavigationListItemConfiguration[] = [];
    this.menu.map((item) => {
      if (item.type === NavigationListItemTypeEnum.GROUP
          && item.children && item.children.length) {
        const children = item.children
            .filter((itm) => !itm.accessConfiguration || this.permissionService.isAccessible(itm.accessConfiguration));
        if (children.length) {
          if (menuItems.length) {
            menuItems.push({type: NavigationListItemTypeEnum.DIVIDER});
          }
          menuItems = menuItems
              .concat(item.label ? {
                          type: NavigationListItemTypeEnum.SUB_HEADER,
                          label: this.t(item.label),
                      } : [])
              .concat(children);
        }
      } else {
        menuItems.push(item);
      }
    });
    return menuItems;
  }
}
