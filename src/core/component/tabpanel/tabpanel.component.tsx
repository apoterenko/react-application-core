import * as React from 'react';

import { toClassName, orNull } from '../../util';
import { BaseComponent } from '../base';
import { ITabPanelProps } from './tabpanel.interface';
import { ITabConfiguration } from '../../configurations-definitions.interface';

export class TabPanel extends BaseComponent<TabPanel, ITabPanelProps> {

  public static defaultProps: ITabPanelProps = {
    useIndicator: true,
  };

  /**
   * @stable [04.05.2018]
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
                          'rac-tab-bar-scroller-indicator',
                          'rac-tab-bar-scroller-indicator-left',
                          'rac-tab-bar-scroller-indicator-back',
                          this.uiFactory.tabBarScrollerIndicator,
                          this.uiFactory.tabBarScrollerIndicatorBack,
                        )}>
          {this.uiFactory.makeTabBarScrollerIndicatorIcon({type: 'navigate_before', className: 'rac-tab-bar-scroller-indicator-icon'})}
        </div>
        <div className={this.uiFactory.tabBarScrollerFrame}>
          <nav className={toClassName(this.uiFactory.tabBarScrollerFrameTabs, this.uiFactory.tabBar)}>
            {
              props.items.map((tab) => (
                <div key={`rac-tab-${tab.value}`}
                     className={toClassName(
                                 'rac-tab',
                                 this.uiFactory.tab,
                                 tab.active && this.uiFactory.tabActive,
                                 tab.selected && 'rac-tab-selected'
                               )}
                     onClick={() => this.onTabClick(tab)}>
                  {
                    orNull<JSX.Element>(
                      tab.url,
                      () => (
                        <div className='rac-tab-url-icon-wrapper'>
                          <img className={toClassName('rac-tab-url-icon', this.uiFactory.tabIcon)}
                               src={tab.url}/>
                        </div>
                      )
                    )
                  }
                  {
                    orNull<JSX.Element>(
                      tab.icon,
                      () => this.uiFactory.makeIcon({ type: tab.icon, className: this.uiFactory.tabIcon })
                    )
                  }
                  {
                    orNull<JSX.Element>(
                      tab.url || tab.icon,
                      () => (
                        <span className={toClassName('rac-tab-icon-text', this.uiFactory.tabIconText)}>
                          {this.t(tab.name)}
                        </span>
                      )
                    )
                  }
                  {orNull<string>(!(tab.url || tab.icon), () => this.t(tab.name))}
                </div>
              ))
            }
            <span className={toClassName(
                                'rac-tab-bar-indicator',
                                !props.useIndicator && 'rac-display-none',
                                this.uiFactory.tabBarIndicator,
                                )}/>
          </nav>
        </div>
        <div className={toClassName(
                          'rac-tab-bar-scroller-indicator',
                          'rac-tab-bar-scroller-indicator-right',
                          'rac-tab-bar-scroller-indicator-forward',
                          this.uiFactory.tabBarScrollerIndicator,
                          this.uiFactory.tabBarScrollerIndicatorForward,
                        )}>
          {this.uiFactory.makeTabBarScrollerIndicatorIcon({type: 'navigate_next', className: 'rac-tab-bar-scroller-indicator-icon'})}
        </div>
      </div>
    );
  }

  /**
   * @stable [07.04.2018]
   * @param {ITabConfiguration} tab
   */
  private onTabClick(tab: ITabConfiguration): void {
    const props = this.props;
    if (props.onClick) {
      props.onClick(tab);
    }
  }
}
