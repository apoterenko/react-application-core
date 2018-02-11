import {
  provideInSingleton,
  lazyInject,
  DI_TYPES,
} from '../di';
import { ApplicationPermissionsServiceT } from '../permissions';
import { INavigationListItemOptions, NavigationListItemTypeEnum } from '../component/list';
import { ApplicationTranslateT } from '../translation';

@provideInSingleton(NavigationMenuBuilder)
export class NavigationMenuBuilder {

  @lazyInject(DI_TYPES.Permission) private permissionService: ApplicationPermissionsServiceT;
  @lazyInject(DI_TYPES.Menu) private menu: INavigationListItemOptions[];
  @lazyInject(DI_TYPES.Translate) private t: ApplicationTranslateT;

  public provide(): INavigationListItemOptions[] {
    let menuItems: INavigationListItemOptions[] = [];
    this.menu.map((item) => {
      if (item.type === NavigationListItemTypeEnum.GROUP
          && item.children && item.children.length) {
        const children = item.children
            .filter((itm) => !itm.accessConfig || this.permissionService.isAccessible(itm.accessConfig));
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
