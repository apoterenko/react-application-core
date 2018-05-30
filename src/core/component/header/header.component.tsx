import * as React from 'react';

import { toClassName, orNull } from '../../util';
import { IHeaderProps } from './header.interface';
import { BaseComponent } from '../base';
import { ToolbarSection } from '../toolbar';
import { Menu } from '../menu';
import { IMenu } from '../menu';

export class Header extends BaseComponent<Header, IHeaderProps> {

  public static defaultProps: IHeaderProps = {
    navigationActionType: 'menu',
  };

  constructor(props: IHeaderProps) {
    super(props);
    this.onNavigationActionClick = this.onNavigationActionClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
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
                  props.children || props.moreOptions,
                  () => (
                      <ToolbarSection className={
                        toClassName(this.uiFactory.toolbarSectionAlignEnd, 'rac-toolbar-section-wrapper')
                      }>
                        {props.children}
                        {
                          orNull<JSX.Element>(
                              props.moreOptions,
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
                          orNull<JSX.Element>(
                              props.moreOptions,
                              () => (
                                  <Menu ref='menu'
                                        options={props.moreOptions}
                                        onSelect={props.onMoreOptionsSelect}/>
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

  private onNavigationActionClick(): void {
    if (this.props.onNavigationActionClick) {
      this.props.onNavigationActionClick();
    }
  }

  private onMenuClick(): void {
    this.menu.show();
  }

  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }
}
