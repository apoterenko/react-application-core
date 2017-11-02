import {
  provideInSingleton,
  lazyInject,
  DI_TYPES,
} from '../di';
import { ApplicationPermissionServiceT } from '../permission';
import { INavigationListItem, NavigationListItemTypeEnum } from '../component/list';

@provideInSingleton(NavigationMenuBuilder)
export class NavigationMenuBuilder {
  @lazyInject(DI_TYPES.Permission) private permissionService: ApplicationPermissionServiceT;
  @lazyInject(DI_TYPES.Menu) private menu: INavigationListItem[];

  public provide(): INavigationListItem[] {
    let menuItems = [];
    this.menu.forEach((item) => {
      if (item.type === NavigationListItemTypeEnum.GROUP
          && item.children && item.children.length) {
        const children = item.children
            .filter((itm) => !itm.accessConfig || this.permissionService.isAccessible(itm.accessConfig));
        if (children.length) {
          if (menuItems.length) {
            menuItems.push({type: NavigationListItemTypeEnum.DIVIDER});
          }
          menuItems = menuItems
              .concat({type: NavigationListItemTypeEnum.SUB_HEADER, text: item.text})
              .concat(children);
        }
      } else {
        menuItems.push(item);
      }
    });
    return menuItems;
  }
}
