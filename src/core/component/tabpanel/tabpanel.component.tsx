import * as React from 'react';
import * as R from 'ramda';

import { toClassName, orNull, isFn } from '../../util';
import { BaseComponent } from '../base';
import { ITabPanelState, ITabPanel } from './tabpanel.interface';
import { ITabConfiguration } from '../../configurations-definitions.interface';
import { ITabPanelProps } from '../../props-definitions.interface';
import { FlexLayout } from '../layout';

export class TabPanel extends BaseComponent<ITabPanelProps, ITabPanelState> implements ITabPanel {

  public static defaultProps: ITabPanelProps = {
    useIndicator: true,
    rippable: true,
    forwardRendered: true,
    backwardRendered: true,
    centered: true,
  };

  /**
   * @stable [11.08.2018]
   * @param {ITabPanelProps} props
   */
  constructor(props: ITabPanelProps) {
    super(props);

    this.getTabElement = this.getTabElement.bind(this);
    this.state = {};
  }

  /**
   * @stable [02.09.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.onDeactivateValue();
  }

  /**
   * @stable [04.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const items = props.items;

    if (items.length <= 1) {
      return null;
    }

    return (
      <FlexLayout
        full={false}
        noShrink={true}
        className='rac-tab-panel-wrapper rac-no-user-select'
      >
        <div ref='self'
             className={toClassName(
                          'rac-tab-panel',
                          'rac-flex',
                          'rac-flex-row',
                          props.centered && 'rac-flex-center',
                          props.className,
                          this.uiFactory.tabBar
                       )}>
          {orNull<JSX.Element>(
            props.backwardRendered,
            () => (
              this.uiFactory.makeIcon({
                type: 'navigate_before',
                className: 'rac-tab-nav-icon',
                onClick: this.onBackward,
              })
            )
          )}
          <div className={toClassName(this.uiFactory.tabBarScroller, 'rac-tab-scroller')}>
            <div className={toClassName(this.uiFactory.tabBarScrollerScrollArea, this.uiFactory.tabBarScrollerScrollAreaScroll)}>
              <div className={toClassName('rac-tab-scroll-content', 'rac-flex-center', this.uiFactory.tabBarScrollerScrollContent)}>
                {items.map(this.getTabElement)}
              </div>
            </div>
          </div>
          {orNull<JSX.Element>(
            props.forwardRendered,
            () => (
              this.uiFactory.makeIcon({
                type: 'navigate_next',
                className: 'rac-tab-nav-icon',
                onClick: this.onForward,
              })
            )
          )}
        </div>
      </FlexLayout>
    );
  }

  /**
   * Each plugin may implement this method
   * @stable [15.08.2018]
   */
  public onForward(): void {
    // Do nothing
  }

  /**
   * Each plugin may implement this method
   * @stable [15.08.2018]
   */
  public onBackward(): void {
    // Do nothing
  }

  /**
   * @stable [14.08.2018]
   * @param {ITabConfiguration} tab
   */
  private onTabClick(tab: ITabConfiguration): void {
    const props = this.props;
    this.setState({activeValue: tab.value});

    this.onDeactivateValue();

    if (isFn(props.onClick)) {
      props.onClick(tab);
    }
  }

  /**
   * @stable [02.09.2018]
   */
  private onDeactivateValue(): void {
    const props = this.props;
    if (isFn(props.onDeactivate)) {
      props.onDeactivate(this.activeValue);
    }
  }

  /**
   * @stable [04.10.2018]
   * @param {ITabConfiguration} tab
   * @param {number} index
   * @returns {JSX.Element}
   */
  private getTabElement(tab: ITabConfiguration, index: number): JSX.Element {
    const props = this.props;
    const items = props.items;

    const activeValue = this.activeValue;
    const isTabActivate = tab.value === activeValue;
    const isLastTabActive = index === items.length - 1;
    const isFirstTabActive = index === 0;

    return (
      <div key={`rac-tab-key-${tab.value}`}
           className={toClassName(
                       'rac-tab',
                       tab.selected && 'rac-tab-selected',
                       items[index + 1] && items[index + 1].value === activeValue && 'rac-previous-tab-active',
                       !isTabActivate && index % 2 === 0 && 'rac-tab-odd',
                       !isTabActivate && isFirstTabActive && 'rac-first-tab',
                       !isTabActivate && isLastTabActive && 'rac-last-tab',
                       isFirstTabActive && 'rac-simple-first-tab',
                       isLastTabActive && 'rac-simple-last-tab',
                       orNull(isTabActivate, 'rac-tab-active')
                     )}
           onClick={() => this.onTabClick(tab)}>
        <FlexLayout
          justifyContentCenter={true}
          alignItemsCenter={true}
          className='rac-tab-content'>
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
        </FlexLayout>
        <span className={toClassName(
                              this.uiFactory.tabIndicator,
                              !props.useIndicator && 'rac-display-none',
                              orNull<string>(tab.value === activeValue, this.uiFactory.tabIndicatorActive)
                            )}>
            <span className={toClassName(
                                'rac-tab-indicator',
                                this.uiFactory.tabIndicatorContent,
                                this.uiFactory.tabIndicatorContentUnderline
                              )}/>
          </span>
      </div>
    );
  }

  /**
   * @stable [02.09.2018]
   * @returns {number}
   */
  private get activeValue(): number {
    const props = this.props;
    const state = this.state;
    const items = props.items;

    return R.isNil(props.activeValue)
      ? (R.isNil(state.activeValue) ? (orNull<number>(items.length, () => items[0].value)) : state.activeValue)
      : props.activeValue;
  }
}
