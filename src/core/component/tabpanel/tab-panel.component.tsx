import * as React from 'react';
import * as R from 'ramda';

import {
  calc,
  ifNotNilThanValue,
  isAllowSingleTab,
  isFn,
  isOddNumber,
  isWrapped,
  joinClassName,
} from '../../util';
import { BaseComponent } from '../base';
import {
  IBaseEvent,
  ITabPanelProps,
  ITabProps,
} from '../../definition';

export class TabPanel extends BaseComponent<ITabPanelProps> {

  /**
   * @stable [12.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {
      children,
      className,
      items,
      wrapperClassName,
    } = props;

    if (items.length <= 1 && !isAllowSingleTab(props)) {
      return null;
    }
    const activeValue = this.activeValue;

    const bodyEl = (
      <div
        ref={this.selfRef}
        className={
          joinClassName(
            'rac-tab-panel',
            calc(className)
          )}>
        {items.map((tab, index) => this.asTabElement(tab, index, activeValue))}
        {children}
      </div>
    );
    if (isWrapped(props)) {
      return (
        <div className={joinClassName('rac-tab-panel__wrapper', calc(wrapperClassName))}>
          {bodyEl}
        </div>
      );
    }
    return bodyEl;
  }

  /**
   * @stable [02.09.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.onDeactivateValue();
  }

  /**
   * @stable [10.02.2020]
   * @param {IBaseEvent} event
   * @param {ITabProps} tab
   */
  private onTabClick(event: IBaseEvent, tab: ITabProps): void {
    this.domAccessor.cancelEvent(event);

    const props = this.props;
    this.onDeactivateValue();

    if (isFn(props.onClick)) {
      props.onClick(tab);
    }
  }

  /**
   * @stable [12.02.2020]
   */
  private onDeactivateValue(): void {
    const {onDeactivate} = this.props;

    if (isFn(onDeactivate)) {
      onDeactivate(this.activeValue); // Is a previous value here
    }
  }

  /**
   * @stable [12.02.2020]
   * @param {ITabProps} tab
   * @param {number} index
   * @param {number} activeValue
   * @returns {JSX.Element}
   */
  private asTabElement(tab: ITabProps, index: number, activeValue: number): JSX.Element {
    const props = this.props;
    const {
      items,
      renderer,
    } = props;

    const isActiveTab = tab.value === activeValue;
    const isAfterActiveTab = ifNotNilThanValue(items[index - 1], (tb) => tb.value === activeValue, false);
    const isBeforeActiveTab = ifNotNilThanValue(items[index + 1], (tb) => tb.value === activeValue, false);
    const isLastTab = index === items.length - 1;
    const isFirstTab = index === 0;
    const callback = (event) => this.onTabClick(event, tab);

    return (
      <div
        key={`rac-tab-key-${tab.value}`}
        className={
          joinClassName(
            'rac-tab-panel__tab',
            isActiveTab ? 'rac-tab-panel__active-tab' : 'rac-tab-panel__inactive-tab',
            isFirstTab && 'rac-tab-panel__first-tab',
            isLastTab && 'rac-tab-panel__last-tab',
            isOddNumber(index) && 'rac-tab-panel__odd-tab',
            isAfterActiveTab && 'rac-tab-panel__after-active-tab',
            isBeforeActiveTab && 'rac-tab-panel__before-active-tab'
          )
        }
        onClick={callback}>
        {
          isFn(renderer)
            ? renderer(tab, callback)
            : (
              tab.icon
                ? (
                  this.uiFactory.makeIcon({
                    className: 'rac-tab-panel__tab-icon',
                    key: `rac-tab-icon-key-${tab.value}`,
                    type: tab.icon,
                  })
                )
                : <div className='rac-tab-panel__tab-content'>{this.t(tab.name)}</div>
            )
        }
      </div>
    );
  }

  /**
   * @stable [12.02.2020]
   * @returns {number}
   */
  private get activeValue(): number {
    const props = this.props;
    const {activeValue, items} = props;

    if (!R.isNil(activeValue)) {
      return activeValue;
    }
    const activeItem = items.find((tab) => tab.active);
    return R.isNil(activeItem) ? items[0].value : activeItem.value;
  }
}
