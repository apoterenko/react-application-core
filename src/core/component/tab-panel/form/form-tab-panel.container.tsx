import * as React from 'react';

import { TabPanelContainer } from '../tab-panel.container';
import {
  IFormTabPanelContainerProps,
  IReduxActiveValueEntity,
} from '../../../definition';

/**
 * @component-container-impl
 * @stable [09.05.2020]
 *
 * Please use the "Mappers.formTabPanelContainerProps"
 */
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
   * @returns {IReduxActiveValueEntity}
   */
  protected get activeValueEntity(): IReduxActiveValueEntity {
    return this.props.form;
  }
}
