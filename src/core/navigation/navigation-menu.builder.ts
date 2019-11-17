import {
  provideInSingleton,
  lazyInject,
  DI_TYPES,
} from '../di';
import {
  DynamicSectionsMapT,
  INavigationItemEntity,
  IPermissionsManager,
  IStackWrapperEntity,
  NavigationItemTypesEnum,
} from '../definition';
import {
  getRoutePathBySection,
  ifNotNilThanValue,
} from '../util';

@provideInSingleton(NavigationMenuBuilder)
export class NavigationMenuBuilder {

  @lazyInject(DI_TYPES.DynamicSections) private readonly dynamicSections: DynamicSectionsMapT;
  @lazyInject(DI_TYPES.Menu) private readonly menu: INavigationItemEntity[];
  @lazyInject(DI_TYPES.PermissionsManager) private readonly permissionsManager: IPermissionsManager;

  public provide(stackWrapper: IStackWrapperEntity): INavigationItemEntity[] {
    let menuItems: INavigationItemEntity[] = [];
    this.menu.forEach((item) => {
      const itemChildren = item.children;

      if (item.type === NavigationItemTypesEnum.GROUP
            && Array.isArray(itemChildren)
            && itemChildren.length > 0) {
        const filteredChildren = itemChildren.filter((itm) => this.isAccessible(itm));

        if (filteredChildren.length) {
          if (menuItems.length) {
            menuItems.push({type: NavigationItemTypesEnum.DIVIDER, parent: item});
          }
          menuItems = menuItems
              .concat(item.label ? {...item, type: NavigationItemTypesEnum.SUB_HEADER} : [])
              .concat(filteredChildren.map((itm): INavigationItemEntity => ({...itm, parent: item})));
        }
      } else if (this.isAccessible(item)) {
        menuItems.push({...item});
      }
    });

    const dynamicSections = this.dynamicSections;

    // TODO refactoring
    const stackRoutePaths = ifNotNilThanValue(
      stackWrapper.stack.stack,
      (stack) => Array.from(stack.map((itm) => getRoutePathBySection(itm.section, dynamicSections))).reverse(),
      []
    );

    let activeItem = null;

    for (const routePath of stackRoutePaths) {
      if (activeItem) {
        break;
      }
      for (const itm of menuItems) {
        if ([itm.link, ...(itm.relatedLinks || [])].includes(routePath)) {
          activeItem = itm;
          break;
        }
      }
    }
    return menuItems.map((item): INavigationItemEntity =>
      activeItem && item === activeItem ? ({...item, active: true}) : ({...item}));
  }

  /**
   * @stable [19.10.2018]
   * @param {INavigationItemEntity} itm
   * @returns {boolean}
   */
  private isAccessible(itm: INavigationItemEntity): boolean {
    return !itm.accessConfiguration || this.permissionsManager.isAccessible(itm.accessConfiguration);
  }
}
