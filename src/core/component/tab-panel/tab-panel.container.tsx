import * as React from 'react';

import { GenericContainer } from '../base/generic.container';
import { TabPanel } from './tab-panel.component';
import {
  ITabPanelContainerProps,
  ITabPanelProps,
  ITabProps,
} from '../../definition';
import { Mappers } from '../../util';

/**
 * @component-container-impl
 * @stable [30.07.2020]
 *
 * Please use the "Mappers.tabPanelContainerProps"
 */
export class TabPanelContainer<TProps extends ITabPanelContainerProps = ITabPanelContainerProps>
  extends GenericContainer<TProps> {

  /**
   * @stable [30.07.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.onDeactivate = this.onDeactivate.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
  }

  /**
   * @stable [30.07.2020]
   */
  public render(): JSX.Element {
    return (
      <TabPanel
        {...this.tabPanelProps}
        onClick={this.onTabClick}
        onDeactivate={this.onDeactivate}
      >
        {this.originalChildren}
      </TabPanel>
    );
  }

  /**
   * @stable [12.04.2020]
   * @param {number} value
   */
  protected dispatchActiveValue(value: number): void {
    this.tabPanelStoreProxy.dispatchTabPanelActiveValue(value);
  }

  /**
   * @stable [12.04.2020]
   * @param {number} value
   */
  protected dispatchInactiveValue(value: number): void {
    this.tabPanelStoreProxy.dispatchTabPanelInactiveValue(value);
  }

  /**
   * @stable [30.07.2020]
   */
  protected get tabPanelProps(): ITabPanelProps {
    return Mappers.tabPanelContainerPropsAsTabPanelProps(this.originalProps);
  }

  /**
   * @stable [12.04.2020]
   * @param {ITabProps} tab
   */
  private onTabClick(tab: ITabProps): void {
    this.dispatchActiveValue(tab.value);
  }

  /**
   * @stable [12.04.2020]
   * @param {number} activeValue
   */
  private onDeactivate(activeValue: number): void {
    this.dispatchInactiveValue(activeValue);
  }
}
