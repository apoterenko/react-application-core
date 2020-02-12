import * as React from 'react';

import { BaseContainer } from '../base';
import {
  TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE,
  TAB_PANEL_DEACTIVATED_VALUE_ACTION_TYPE,
} from './tabpanel.interface';
import {
  IActiveValueWrapper,
  IPayloadWrapper,
} from '../../definitions.interface';
import { TabPanel } from './tab-panel.component';
import {
  ITabPanelContainerProps,
  ITabProps,
} from '../../definition';

export class TabPanelContainer<TProps extends ITabPanelContainerProps = ITabPanelContainerProps>
  extends BaseContainer<TProps> {

  /**
   * @stable [30.08.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onTabClick = this.onTabClick.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
  }

  /**
   * @stable [30.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <TabPanel
        {...this.props.tabPanelConfiguration}
        activeValue={this.getActiveValueWrapper().activeValue}
        onDeactivate={this.onDeactivate}
        onClick={this.onTabClick}
      >
        {this.props.children}
      </TabPanel>
    );
  }

  /**
   * @stable [12.02.2020]
   * @returns {IActiveValueWrapper}
   */
  protected getActiveValueWrapper(): IActiveValueWrapper {
    return this.props.tabPanel;
  }

  /**
   * @stable [30.08.2018]
   * @param {IPayloadWrapper<number>} payloadWrapper
   */
  protected dispatchActiveValue(payloadWrapper: IPayloadWrapper<number>): void {
    this.dispatchFrameworkAction(TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [30.08.2018]
   * @param {IPayloadWrapper<number>} payloadWrapper
   */
  protected dispatchDeactivatedValue(payloadWrapper: IPayloadWrapper<number>): void {
    this.dispatchFrameworkAction(TAB_PANEL_DEACTIVATED_VALUE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [30.08.2018]
   * @param {IGenericTabEntity} tab
   */
  private onTabClick(tab: ITabProps): void {
    const payloadWrapper: IPayloadWrapper<number> = {payload: tab.value};
    this.dispatchActiveValue(payloadWrapper);
  }

  /**
   * @stable [02.09.2018]
   * @param {number} activeValue
   */
  private onDeactivate(activeValue: number): void {
    const payloadWrapper: IPayloadWrapper<number> = {payload: activeValue};
    this.dispatchDeactivatedValue(payloadWrapper);
  }
}
