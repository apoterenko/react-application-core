import * as React from 'react';
import * as R from 'ramda';

import { toClassName, uuid, orNull, ifNotFalseThanValue  } from '../../../util';
import { Link } from '../../link';
import { INavigationListProps } from './navigation-list.interface';
import { ListDivider } from '../../list';
import { FlexLayout } from '../../layout';
import { LayoutModeEnum } from '../../../entities-definitions.interface';
import { NavigationItemTypesEnum, INavigationItemEntity } from '../../../definition';
import { UniversalComponent } from '../../base/universal.component';
import { IOnScrollWrapper } from '../../../definitions.interface';

export class NavigationList extends UniversalComponent<INavigationListProps>
  implements IOnScrollWrapper {

  /**
   * @stable [11.08.2018]
   * @param {INavigationListProps} props
   */
  constructor(props: INavigationListProps) {
    super(props);
    this.toElement = this.toElement.bind(this);
  }

  /**
   * @stable [23.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
        <nav ref='self'
             className='rac-navigation-list rac-no-user-select'
             onScroll={this.onScroll}>
          <ListDivider/>
          {this.props.items.map(this.toElement)}
        </nav>
    );
  }

  /**
   * @stable [17.12.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();
    this.domAccessor.scrollTo(this.props, this.getSelf());
  }

  /**
   * @stable [22.09.2019]
   */
  public onScroll(): void {
    // Each plugin should override this method
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} item
   * @returns {JSX.Element}
   */
  private toElement(item: INavigationItemEntity): JSX.Element {
    const isExpanded = this.isItemExpanded(item);
    const fullLayoutModeEnabled = this.fullLayoutModeEnabled;
    const label = this.t(item.label);

    switch (item.type) {
      case NavigationItemTypesEnum.SUB_HEADER:
        const isGroupItemActive = !isExpanded && this.hasActiveChild(item);
        return (
          <FlexLayout key={this.toUniqueKey(item.label, 'label')}
                      row={true}
                      alignItemsCenter={true}
                      className={toClassName(
                        'rac-navigation-list-group',
                        isGroupItemActive
                          ? 'rac-navigation-list-item-active'
                          : (isExpanded ? 'rac-navigation-list-item-expanded' : ''),
                      )}
                      title={label}
                      onClick={() => this.onGroupLinkClick(item)}>
            {this.uiFactory.makeIcon({
              key: this.toUniqueKey(item.label, 'group-icon'),
              type: item.icon || 'list',
              className: 'rac-navigation-list-icon',
            })}
            {
              orNull<JSX.Element>(
                fullLayoutModeEnabled,
                () => <span className='rac-navigation-list-group-label rac-flex-full'>{label}</span>
              )
            }
            {orNull<JSX.Element>(
              fullLayoutModeEnabled,
              () => (
                this.uiFactory.makeIcon({
                  key: this.toUniqueKey(item.label, 'group-expand-icon'),
                  type: isExpanded ? 'dropdown-opened' : 'dropdown',
                  className: 'rac-navigation-list-group-expand-icon rac-navigation-list-icon',
                })
              )
            )}
          </FlexLayout>
        );
      case NavigationItemTypesEnum.DIVIDER:
        return ifNotFalseThanValue(
          this.props.dividerRendered,
          () => <ListDivider key={R.isNil(item.parent) ? uuid() : this.toUniqueKey(item.parent.label, 'divider')}/>
        );
      default:
        const itemAsGroup = R.isNil(item.parent);
        return orNull<JSX.Element>(
          isExpanded || itemAsGroup,
          () => (
            <Link to={item.link}
                  key={this.toUniqueKey(item.link, 'link')}
                  className={toClassName(
                    'rac-navigation-list-item',
                    item.active
                      ? 'rac-navigation-list-item-active'
                      : (isExpanded ? 'rac-navigation-list-item-expanded' : ''),
                    itemAsGroup && 'rac-navigation-list-item-as-group',
                    'rac-flex',
                    'rac-flex-row',
                    'rac-flex-full',
                    'rac-flex-align-items-center'
                  )}
                  title={label}>
              {this.uiFactory.makeIcon({
                type: item.icon,
                key: this.toUniqueKey(item.link, 'icon'),
                className: 'rac-navigation-list-icon',
              })}
              {
                orNull<JSX.Element>(
                  fullLayoutModeEnabled,
                  () => <span className='rac-navigation-list-item-label'>{label}</span>
                )
              }
            </Link>
          )
        );
    }
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} config
   */
  private onGroupLinkClick(config: INavigationItemEntity): void {
    const props = this.props;
    if (props.onGroupClick) {
      props.onGroupClick(config);
    }
  }

  /**
   * @stable [23.09.2018]
   * @param {string} link
   * @param {string} prefix
   * @returns {string}
   */
  private toUniqueKey(link: string, prefix: string): string {
    return `navigation-list-key-${link}-${prefix}`;
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} item
   * @returns {boolean}
   */
  private isItemExpanded(item: INavigationItemEntity): boolean {
    const expandedGroups = this.props.expandedGroups;
    return expandedGroups[item.value] === true
      || (!R.isNil(item.parent) && expandedGroups[item.parent.value] === true);
  }

  /**
   * @stable [23.09.2018]
   * @returns {boolean}
   */
  private get fullLayoutModeEnabled(): boolean {
    return this.props.mode === LayoutModeEnum.FULL;
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} item
   * @returns {boolean}
   */
  private hasActiveChild(item: INavigationItemEntity): boolean {
    const activeItem = R.find((itm) => !!itm.active, this.props.items);
    return !R.isNil(activeItem) && !R.isNil(R.find((child) => child.link === activeItem.link, item.children || []));
  }
}
