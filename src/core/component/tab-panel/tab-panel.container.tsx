import * as React from 'react';

import { GenericContainer } from '../base/generic.container';
import { TabPanel } from './tab-panel.component';
import {
  IGenericActiveValueEntity,
  ITabPanelContainerProps,
  ITabProps,
} from '../../definition';
import { mapActiveValueWrapper } from '../../util';

export class TabPanelContainer<TProps extends ITabPanelContainerProps = ITabPanelContainerProps>
  extends GenericContainer<TProps> {

  /**
   * @stable [12.04.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onTabClick = this.onTabClick.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
  }

  /**
   * @stable [12.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <TabPanel
        {...mapActiveValueWrapper(this.activeValueEntity)}
        {...props.tabPanelConfiguration}
        onClick={this.onTabClick}
        onDeactivate={this.onDeactivate}
      >
        {props.children}
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
   * @stable [12.04.2020]
   * @returns {IGenericActiveValueEntity}
   */
  protected get activeValueEntity(): IGenericActiveValueEntity {
    return this.props.tabPanel;
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
