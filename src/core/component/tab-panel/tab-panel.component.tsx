import * as React from 'react';
import * as R from 'ramda';

import {
  CalcUtils,
  ClsUtils,
  ifNotNilThanValue,
  isFn,
  NumberUtils,
  TypeUtils,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
import {
  IBaseEvent,
  ITabPanelProps,
  ITabProps,
  TabPanelClassesEnum,
} from '../../definition';

export class TabPanel extends GenericComponent<ITabPanelProps> {

  public static readonly defaultProps: ITabPanelProps = {
    wrapped: true,
  };

  /**
   * @stable [12.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      allowSingleTab,
      className,
      items,
      wrapped,
      wrapperClassName,
    } = this.originalProps;

    if (items.length <= 1 && !allowSingleTab) {
      return null;
    }
    const activeValue = this.activeValue;

    const bodyEl = (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            TabPanelClassesEnum.TAB_PANEL,
            CalcUtils.calc(className)
          )}>
        {items.map((tab, index) => this.asTabElement(tab, index, activeValue))}
        {this.originalChildren}
      </div>
    );

    if (wrapped) {
      return (
        <div
          className={ClsUtils.joinClassName(TabPanelClassesEnum.TAB_PANEL_WRAPPER, CalcUtils.calc(wrapperClassName))}>
          {bodyEl}
        </div>
      );
    }
    return bodyEl;
  }

  /**
   * @stable [28.07.2020]
   */
  public componentWillUnmount(): void {
    this.onDeactivateValue();
  }

  /**
   * @stable [28.07.2020]
   * @param event
   * @param tab
   */
  private onTabClick(event: IBaseEvent, tab: ITabProps): void {
    const {
      onClick,
    } = this.originalProps;

    this.domAccessor.cancelEvent(event);
    this.onDeactivateValue();

    if (TypeUtils.isFn(onClick)) {
      onClick(tab);
    }
  }

  /**
   * @stable [28.07.2020]
   */
  private onDeactivateValue(): void {
    const {
      onDeactivate,
    } = this.originalProps;

    if (TypeUtils.isFn(onDeactivate)) {
      onDeactivate(this.activeValue); // Previous value is here
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
          ClsUtils.joinClassName(
            'rac-tab-panel__tab',
            isActiveTab ? 'rac-tab-panel__active-tab' : 'rac-tab-panel__inactive-tab',
            isFirstTab && 'rac-tab-panel__first-tab',
            isLastTab && 'rac-tab-panel__last-tab',
            NumberUtils.isOddNumber(index) && 'rac-tab-panel__odd-tab',
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
