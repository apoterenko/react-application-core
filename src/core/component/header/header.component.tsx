import * as React from 'react';

import { toClassName, orNull } from '../../util';
import { IHeaderInternalProps } from './header.interface';
import { BaseComponent } from '../base';
import { ToolbarSection } from '../toolbar';
import { Menu } from '../menu';
import { IMenu, IMenuAction, MenuActionT } from '../menu';

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
                              this.uiFactory.toolbar,
                              'rac-header',
                              props.className,
                          )}>
          <div className={this.uiFactory.toolbarRow}>
            <ToolbarSection className={toClassName(
                                          'rac-navigation-section',
                                          this.uiFactory.toolbarSectionAlignStart
                                      )}>
              {
                this.uiFactory.makeIcon({
                  simple: true,
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
                      <ToolbarSection className={
                        toClassName(this.uiFactory.toolbarSectionAlignEnd, 'rac-toolbar-section-wrapper')
                      }>
                        {props.children}
                        {
                          orNull(
                              props.menuActions,
                              () => (
                                  this.uiFactory.makeIcon({
                                    simple: true,
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
