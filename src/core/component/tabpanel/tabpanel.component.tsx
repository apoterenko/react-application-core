import * as React from 'react';

import { toClassName, orNull } from '../../util';
import { BaseComponent } from '../base';
import { ITabPanelProps, ITabPanelState } from './tabpanel.interface';
import { ITabConfiguration } from '../../configurations-definitions.interface';

export class TabPanel extends BaseComponent<TabPanel, ITabPanelProps, ITabPanelState> {

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
    this.onNextClick = this.onNextClick.bind(this);
    this.onBeforeClick = this.onBeforeClick.bind(this);
    this.state = {};
  }

  /**
   * @stable [11.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const items = props.items.filter((item) => !!item);
    const selectedIndex = this.state.value || 0;

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
          onClick: this.onBeforeClick,
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
                items.map((tab, index) => (
                  <div key={`rac-tab-${tab.value}`}
                          className={toClassName(
                                        'rac-tab',
                                        tab.selected && 'rac-tab-selected',
                                        this.uiFactory.tab,
                                        orNull<string>(index === selectedIndex, this.uiFactory.tabActive)
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
                                        orNull<string>(index === selectedIndex, this.uiFactory.tabIndicatorActive)
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
          onClick: this.onNextClick,
        })}
      </div>
    );
  }

  private onNextClick(): void {

  }

  private onBeforeClick(): void {

  }

  /**
   * @stable [11.08.2018]
   * @param {ITabConfiguration} tab
   */
  private onTabClick(tab: ITabConfiguration): void {
    const props = this.props;
    const value = props.items.findIndex((item) => item.value === tab.value);
    this.setState({value});

    if (props.onClick) {
      props.onClick(tab);
    }
  }
}
