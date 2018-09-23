import {
  provideInSingleton,
  lazyInject,
  DI_TYPES,
} from '../di';
import { IPermissionsService } from '../permissions';
import { INavigationListItemConfiguration, NavigationListItemTypeEnum } from '../configurations-definitions.interface';

@provideInSingleton(NavigationMenuBuilder)
export class NavigationMenuBuilder {

  @lazyInject(DI_TYPES.Permission) private permissionService: IPermissionsService;
  @lazyInject(DI_TYPES.Menu) private menu: INavigationListItemConfiguration[];

  public provide(): INavigationListItemConfiguration[] {
    let menuItems: INavigationListItemConfiguration[] = [];
    this.menu.forEach((item) => {
      const itemChildren = item.children;
      if (item.type === NavigationListItemTypeEnum.GROUP && Array.isArray(itemChildren) && itemChildren.length) {
        const filteredChildren = itemChildren
            .filter((itm) => !itm.accessConfiguration || this.permissionService.isAccessible(itm.accessConfiguration));

        if (filteredChildren.length) {
          if (menuItems.length) {
            menuItems.push({type: NavigationListItemTypeEnum.DIVIDER, parent: item});
          }
          menuItems = menuItems
              .concat(item.label ? {...item, type: NavigationListItemTypeEnum.SUB_HEADER} : [])
              .concat(filteredChildren.map((itm): INavigationListItemConfiguration => ({...itm, parent: item})));
        }
      } else {
        menuItems.push({...item});
      }
    });
    return menuItems;
  }
}
