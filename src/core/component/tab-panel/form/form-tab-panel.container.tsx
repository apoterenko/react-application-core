import * as React from 'react';

import { TabPanelContainer } from '../tab-panel.container';
import {
  IFormTabPanelContainerProps,
  IGenericActiveValueEntity,
} from '../../../definition';

export class FormTabPanelContainer extends TabPanelContainer<IFormTabPanelContainerProps> {

  /**
   * @stable [12.04.2020]
   * @param {number} value
   */
  protected dispatchActiveValue(value: number): void {
    this.formStoreProxy.dispatchFormActiveValue(value);
  }

  /**
   * @stable [12.04.2020]
   * @param {number} value
   */
  protected dispatchInactiveValue(value: number): void {
    this.formStoreProxy.dispatchFormInactiveValue(value);
  }

  /**
   * @stable [12.04.2020]
   * @returns {IGenericActiveValueEntity}
   */
  protected get activeValueEntity(): IGenericActiveValueEntity {
    return this.props.form;
  }
}
