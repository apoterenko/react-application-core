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

  /**
   * @stable [31.05.2018]
   * @param {IHeaderProps} props
   */
  constructor(props: IHeaderProps) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  /**
   * @stable [24.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
        <header className={toClassName(this.uiFactory.toolbar, 'rac-header', props.className)}>
          <div className={this.uiFactory.toolbarRow}>
            <ToolbarSection className={toClassName('rac-navigation-section', this.uiFactory.toolbarSectionAlignStart)}>
              {
                this.uiFactory.makeIcon({
                  type: props.navigationActionType,
                  className: 'rac-toolbar-menu-icon',
                  onClick: props.onNavigationActionClick,
                })
              }
              <span className='rac-toolbar-title'>{props.title}</span>
            </ToolbarSection>
            {
              orNull<JSX.Element>(
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
                                    type: 'more_vert',
                                    className: 'rac-toolbar-menu-icon',
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

  /**
   * @stable [31.05.2018]
   */
  private onMenuClick(): void {
    this.menu.show();
  }

  /**
   * @stable [31.05.2018]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }
}
