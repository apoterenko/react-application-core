import * as React from 'react';

import { toClassName, orNull } from '../../util';
import { IHeaderInternalProps } from './header.interface';
import { BaseComponent } from '../../component/base';
import { ToolbarSection } from '../../component/toolbar';
import { Menu } from '../../component/menu';
import { IMenu, IMenuAction, MenuActionT } from '../../component/menu';

export class Header extends BaseComponent<Header, IHeaderInternalProps, {}> {

  public static defaultProps: IHeaderInternalProps = {
    navigationActionType: 'menu',
  };

  constructor(props: IHeaderInternalProps) {
    super(props);
    this.onNavigationActionClick = this.onNavigationActionClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onMenuActionClick = this.onMenuActionClick.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;

    return (
        <header className={toClassName(
                              'rac-header',
                              props.activeFilter && 'rac-header-filter-active',
                              this.uiFactory.toolbar
                          )}>
          <div className={this.uiFactory.toolbarRow}>
            <ToolbarSection className={toClassName(
                                          'rac-navigation-section',
                                          this.uiFactory.toolbarSectionAlignStart
                                      )}>
              {
                this.uiFactory.makeIcon({
                  type: props.navigationActionType,
                  className: this.uiFactory.toolbarMenuIcon,
                  onClick: this.onNavigationActionClick,
                })
              }
              <span className={this.uiFactory.toolbarTitle}>{props.title}</span>
            </ToolbarSection>
            {
              orNull(
                  props.children || props.menuActions,
                  () => (
                      <ToolbarSection className={this.uiFactory.toolbarSectionAlignEnd}>
                        {props.children}
                        {
                          orNull(
                              props.menuActions,
                              () => (
                                  this.uiFactory.makeIcon({
                                    type: 'more_vert',
                                    className: this.uiFactory.toolbarMenuIcon,
                                    onClick: this.onMenuClick,
                                  })
                              )
                          )
                        }
                        {
                          orNull(
                              props.menuActions,
                              () => (
                                  <Menu ref='menu'
                                        options={props.menuActions}
                                        onSelect={this.onMenuActionClick}/>
                              )
                          )
                        }
                      </ToolbarSection>
                  )
              )
            }
          </div>
        </header>
    );
  }

  private onMenuActionClick(option: MenuActionT): void {
    if (this.props.menuActionHandler) {
      this.props.menuActionHandler(option);
    }
  }

  private onNavigationActionClick(): void {
    if (this.props.navigationActionHandler) {
      this.props.navigationActionHandler();
    }
  }

  private onMenuClick(): void {
    this.menu.show();
  }

  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }
}
