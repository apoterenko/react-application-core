import * as React from 'react';

import { FORM_ACTIVE_VALUE_ACTION_TYPE, FORM_INACTIVE_VALUE_ACTION_TYPE } from '../../form';
import {
  IActiveValueWrapper,
  IPayloadWrapper,
} from '../../../definitions.interface';
import { TabPanelContainer } from '../tabpanel.container';
import {
  IExtendedFormEditableEntity,
  ITabPanelContainerProps,
} from '../../../definition';

export class FormTabPanelContainer
  extends TabPanelContainer<ITabPanelContainerProps & IExtendedFormEditableEntity> {

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
    this.dispatchFrameworkAction(FORM_INACTIVE_VALUE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [12.02.2020]
   * @returns {IActiveValueWrapper}
   */
  protected getActiveValueWrapper(): IActiveValueWrapper {
    return this.props.form;
  }
}
