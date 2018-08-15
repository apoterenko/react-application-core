import * as React from 'react';
import * as R from 'ramda';

import { toClassName, orNull } from '../../util';
import { BaseComponent } from '../base';
import { ITabPanelProps, ITabPanelState, ITabPanel } from './tabpanel.interface';
import { ITabConfiguration } from '../../configurations-definitions.interface';

export class TabPanel extends BaseComponent<TabPanel, ITabPanelProps, ITabPanelState>
  implements ITabPanel {

  public static defaultProps: ITabPanelProps = {
    useIndicator: true,
    rippable: true,
  };

  /**
   * @stable [11.08.2018]
   * @param {ITabPanelProps} props
   */
  constructor(props: ITabPanelProps) {
    super(props);
    this.state = {};
  }

  /**
   * @stable [14.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const state = this.state;
    const items = props.items;
    const activeValue = R.isNil(props.activeValue)
      ? (R.isNil(state.activeValue) ? items[0].value : state.activeValue)
      : props.activeValue;

    return (
      <div ref='self'
           className={toClassName(
                        'rac-tab-panel',
                        'rac-flex',
                        'rac-flex-row',
                        'rac-flex-center',
                        props.className,
                        this.uiFactory.tabBar
                     )}>
        {this.uiFactory.makeIcon({
          type: 'navigate_before',
          className: 'rac-tab-nav-icon',
          onClick: this.onBackward,
        })}
        <div className={toClassName(this.uiFactory.tabBarScroller, 'rac-tab-scroller')}>
          <div className={toClassName(
                              this.uiFactory.tabBarScrollerScrollArea,
                              this.uiFactory.tabBarScrollerScrollAreaScroll)
                          }>
            <div className={toClassName(
                              'rac-tab-scroll-content',
                              'rac-flex-center',
                              this.uiFactory.tabBarScrollerScrollContent)
                           }>
              {
                items.map((tab) => (
                  <div key={`rac-tab-${tab.value}`}
                          className={toClassName(
                                        'rac-tab',
                                        tab.selected && 'rac-tab-selected',
                                        this.uiFactory.tab,
                                        orNull<string>(tab.value === activeValue, this.uiFactory.tabActive)
                                    )}
                          onClick={() => this.onTabClick(tab)}>
                    <span className={this.uiFactory.tabContent}>
                      <div>
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
                            () => this.uiFactory.makeIcon({type: tab.icon, className: this.uiFactory.tabIcon})
                          )
                        }
                        {
                          orNull<JSX.Element>(
                            tab.url || tab.icon,
                            () => (
                              <div className={toClassName('rac-tab-icon-text', this.uiFactory.tabIconText)}>
                                {this.t(tab.name)}
                              </div>
                            )
                          )
                        }
                        {orNull<string>(!(tab.url || tab.icon), () => this.t(tab.name))}
                      </div>
                     </span>
                     <span className={toClassName(
                                        this.uiFactory.tabIndicator,
                                        !props.useIndicator && 'rac-display-none',
                                        orNull<string>(tab.value === activeValue, this.uiFactory.tabIndicatorActive)
                                      )}>
                        <span className={toClassName(
                                            this.uiFactory.tabIndicatorContent,
                                            this.uiFactory.tabIndicatorContentUnderline
                                         )}/>
                    </span>
                    <span className={toClassName(!props.rippable && 'rac-tab-no-rippable',
                                    this.uiFactory.tabRipple)}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {this.uiFactory.makeIcon({
          type: 'navigate_next',
          className: 'rac-tab-nav-icon',
          onClick: this.onForward,
        })}
      </div>
    );
  }

  /**
   * Each plugin may implement this method
   * @stable [15.08.2018]
   */
  public onForward(): void {
    // Nothing to do
  }

  /**
   * Each plugin may implement this method
   * @stable [15.08.2018]
   */
  public onBackward(): void {
    // Nothing to do
  }

  /**
   * @stable [14.08.2018]
   * @param {ITabConfiguration} tab
   */
  private onTabClick(tab: ITabConfiguration): void {
    const props = this.props;
    this.setState({activeValue: tab.value});

    if (props.onClick) {
      props.onClick(tab);
    }
  }
}
