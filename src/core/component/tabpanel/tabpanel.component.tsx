import * as React from 'react';

import { toClassName, orNull } from '../../util';
import { BaseComponent } from '../base';
import { ITabPanelProps } from './tabpanel.interface';
import { ITabConfiguration } from '../../configurations-definitions.interface';

export class TabPanel extends BaseComponent<TabPanel, ITabPanelProps> {

  /**
   * @stable - 07.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div ref='self'
           className={toClassName(
                         'rac-tab-panel',
                         props.className,
                         this.uiFactory.tabBarScroller
                       )}>
        <div className={toClassName(
                          this.uiFactory.tabBarScrollerIndicator,
                          this.uiFactory.tabBarScrollerIndicatorBack,
                        )}>
          {this.uiFactory.makeTabBarScrollerIndicatorIcon('navigate_before')}
        </div>
        <div className={this.uiFactory.tabBarScrollerFrame}>
          <nav className={toClassName(
                            this.uiFactory.tabBarScrollerFrameTabs,
                            this.uiFactory.tabBar,
                         )}>
            {
              props.items.map((tab) => (
                <div key={`rac-tab-${tab.value}`}
                     className={toClassName(
                       'rac-tab',
                       this.uiFactory.tab,
                       tab.active && this.uiFactory.tabActive
                     )}
                     onClick={() => this.onTabClick(tab)}>
                  {this.t(tab.name)}
                  {orNull(tab.icon, () => this.uiFactory.makeIcon({ type: tab.icon, className: 'rac-tab-icon' }))}
                </div>
              ))
            }
            {this.uiFactory.makeTabBarIndicator()}
          </nav>
        </div>
        <div className={toClassName(
                          this.uiFactory.tabBarScrollerIndicator,
                          this.uiFactory.tabBarScrollerIndicatorForward,
                        )}>
          {this.uiFactory.makeTabBarScrollerIndicatorIcon('navigate_next')}
        </div>
      </div>
    );
  }

  /**
   * @stable - 07.04.2018
   * @param {ITabConfiguration} tab
   */
  private onTabClick(tab: ITabConfiguration): void {
    const props = this.props;
    if (props.onClick) {
      props.onClick(tab);
    }
  }
}
