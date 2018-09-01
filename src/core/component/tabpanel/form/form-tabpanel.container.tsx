import * as React from 'react';

import { FORM_ACTIVE_VALUE_ACTION_TYPE, FORM_DEACTIVATED_VALUE_ACTION_TYPE } from '../../form';
import { IPayloadWrapper } from '../../../definitions.interface';
import { TabPanelContainer } from '../tabpanel.container';
import { getFormTabActiveValue } from '../../form';

export class FormTabPanelContainer extends TabPanelContainer {

  /**
   * @stable [30.08.2018]
   * @param {IPayloadWrapper<number>} payloadWrapper
   */
  protected dispatchActiveValue(payloadWrapper: IPayloadWrapper<number>): void {
    this.dispatchFrameworkAction(FORM_ACTIVE_VALUE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [02.09.2018]
   * @param {IPayloadWrapper<number>} payloadWrapper
   */
  protected dispatchDeactivatedValue(payloadWrapper: IPayloadWrapper<number>): void {
    this.dispatchFrameworkAction(FORM_DEACTIVATED_VALUE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [30.08.2018]
   * @returns {number}
   */
  protected getTabActiveValue(): number {
    const props = this.props;
    return getFormTabActiveValue(props, props.tabPanelConfiguration);
  }
}
