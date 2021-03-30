import * as React from 'react';
import * as R from 'ramda';

import {
  CalcUtils,
  ClsUtils,
  FilterUtils,
  NumberUtils,
  PropsUtils,
  TypeUtils,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
import {
  ITabPanel,
  ITabPanelProps,
  ITabProps,
  TabPanelClassesEnum,
} from '../../definition';

/**
 * @component-impl
 * @stable [30.03.2021]
 */
export class TabPanel extends GenericComponent<ITabPanelProps>
  implements ITabPanel {

  public static readonly defaultProps: ITabPanelProps = {
    wrapped: true,
  };

  /**
   * @stable [30.03.2021]
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

    const el = (
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
          className={
            ClsUtils.joinClassName(
              TabPanelClassesEnum.TAB_PANEL_WRAPPER,
              CalcUtils.calc(wrapperClassName)
            )
          }
        >
          {el}
        </div>
      );
    }
    return el;
  }

  /**
   * @stable [30.03.2021]
   */
  public componentWillUnmount(): void {
    this.onDeactivateValue();
  }

  /**
   * @stable [30.03.2021]
   * @param item
   */
  private onTabClick(item: ITabProps): void {
    const {
      onClick,
    } = this.originalProps;

    this.onDeactivateValue();

    if (TypeUtils.isFn(onClick)) {
      const self = this;
      onClick({item, self});
    }
  }

  /**
   * @stable [30.03.2021]
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
   * @stable [30.03.2021]
   * @param item
   * @param index
   * @param activeValue
   */
  private asTabElement(item: ITabProps, index: number, activeValue: number): JSX.Element {
    const {
      items,
      renderer,
    } = this.originalProps;

    const isActiveTab = item.value === activeValue;
    const isAfterActiveTab = items[index - 1]?.value === activeValue;
    const isBeforeActiveTab = items[index + 1]?.value === activeValue;
    const isLastTab = index === items.length - 1;
    const isFirstTab = index === 0;

    return (
      <div
        key={`rac-tab-key-${item.value}`}
        className={
          ClsUtils.joinClassName(
            TabPanelClassesEnum.TAB,
            isActiveTab ? TabPanelClassesEnum.ACTIVE_TAB : TabPanelClassesEnum.INACTIVE_TAB,
            isFirstTab && TabPanelClassesEnum.FIRST_TAB,
            isLastTab && TabPanelClassesEnum.LAST_TAB,
            NumberUtils.isOddNumber(index) && TabPanelClassesEnum.ODD_TAB,
            isAfterActiveTab && TabPanelClassesEnum.AFTER_ACTIVE_TAB,
            isBeforeActiveTab && TabPanelClassesEnum.BEFORE_ACTIVE_TAB
          )
        }
        {...PropsUtils.buildClickHandlerProps(() => this.onTabClick(item), true, false)}
      >
        {
          TypeUtils.isFn(renderer)
            ? (
              renderer({
                item,
                contentWrapperElement: this.getContentWrapperElement,
              })
            )
            : (
              item.icon
                ? (
                  this.uiFactory.makeIcon({
                    className: TabPanelClassesEnum.TAB_ICON,
                    type: item.icon,
                  })
                )
                : this.getContentWrapperElement(this.t(item.name))
            )
        }
      </div>
    );
  }

  /**
   * @stable [30.03.2021]
   * @param content
   */
  private getContentWrapperElement(content: React.ReactNode): JSX.Element {
    return (
      <div
        className={TabPanelClassesEnum.TAB_CONTENT}
      >
        {content}
      </div>
    );
  }

  /**
   * @stable [30.03.2021]
   */
  private get activeValue(): number {
    const {
      activeValue,
      items,
    } = this.originalProps;

    if (!R.isNil(activeValue)) {
      return activeValue;
    }
    const activeItem = items.find(FilterUtils.ACTIVE_WRAPPER_PREDICATE);
    return R.isNil(activeItem) ? items[0].value : activeItem.value;
  }
}
