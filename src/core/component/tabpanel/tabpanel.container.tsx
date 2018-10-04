import * as React from 'react';

import { BaseContainer } from '../base';
import {
  ITabPanelContainerProps,
  TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE,
  TAB_PANEL_DEACTIVATED_VALUE_ACTION_TYPE,
} from './tabpanel.interface';
import { getTabActiveValue } from './tabpanel.support';
import { ITabConfiguration } from '../../configurations-definitions.interface';
import { IPayloadWrapper } from '../../definitions.interface';
import { TabPanel } from './tabpanel.component';

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
      <TabPanel useIndicator={false}
                forwardRendered={false}
                backwardRendered={false}
                centered={false}
                {...this.props.tabPanelConfiguration}
                onDeactivate={this.onDeactivate}
                activeValue={this.getTabActiveValue()}
                onClick={this.onTabClick}/>
    );
  }

  /**
   * @stable [30.08.2018]
   * @returns {number}
   */
  protected getTabActiveValue(): number {
    const props = this.props;
    return getTabActiveValue(props.tabPanel, props.tabPanelConfiguration);
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
   * @param {ITabConfiguration} tab
   */
  private onTabClick(tab: ITabConfiguration): void {
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
