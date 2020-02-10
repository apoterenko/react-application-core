import * as React from 'react';

import {
  calc,
  isFn,
  joinClassName,
  nvl,
  orNull,
} from '../../util';
import { BaseComponent } from '../base';
import {
  IBaseEvent,
  ITabPanelProps,
  ITabProps,
} from '../../definition';

export class TabPanel extends BaseComponent<ITabPanelProps> {

  public static readonly defaultProps: ITabPanelProps = {
    default: true,
  };

  /**
   * @stable [10.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const items = props.items;

    if (items.length <= 1) {
      return null;
    }

    return (
      <div className='rac-tab-panel__wrapper'>
        <div
          ref={this.selfRef}
          className={
            joinClassName(
              props.default && 'rac-default-tab-panel',
              'rac-tab-panel',
              calc(props.className)
            )}>
          {items.map(this.getTabElement, this)}
        </div>
      </div>
    );
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
   * @stable [02.09.2018]
   */
  private onDeactivateValue(): void {
    const props = this.props;
    if (isFn(props.onDeactivate)) {
      props.onDeactivate(this.activeValue);
    }
  }

  /**
   * @stable [10.02.2020]
   * @param {ITabProps} tab
   * @param {number} index
   * @returns {JSX.Element}
   */
  private getTabElement(tab: ITabProps, index: number): JSX.Element {
    const props = this.props;
    const {
      items,
      renderer,
    } = props;

    const activeValue = this.activeValue;
    const isActiveTab = tab.value === activeValue;
    const isLastTab = index === items.length - 1;
    const isFirstTab = index === 0;

    return (
      <div
        key={`rac-tab-key-${tab.value}`}
        className={
          joinClassName(
            'rac-tab-panel__tab',
            items[index + 1] && items[index + 1].value === activeValue && 'rac-previous-tab-active',
            !isActiveTab && index % 2 === 0 && 'rac-tab-odd',
            !isActiveTab && isFirstTab && 'rac-first-tab',
            !isActiveTab && isLastTab && 'rac-last-tab',
            isFirstTab && 'rac-simple-first-tab',
            isLastTab && 'rac-simple-last-tab',
            orNull(isActiveTab, 'rac-tab-active')
          )}
        onClick={(event) => this.onTabClick(event, tab)}>
        {
          isFn(renderer)
            ? renderer(tab)
            : (
              tab.icon
                ? this.uiFactory.makeIcon({
                  className: 'rac-tab-panel__tab-icon',
                  key: `rac-tab-icon-key-${tab.value}`,
                  type: tab.icon,
                })
                : <div className='rac-tab-panel__tab-content'>{this.t(tab.name)}</div>
            )
        }
      </div>
    );
  }

  /**
   * @stable [10.02.2020]
   * @returns {number}
   */
  private get activeValue(): number {
    const props = this.props;
    const {activeValue, items} = props;

    return nvl(activeValue, orNull(items.length, () => items[0].value));
  }
}
