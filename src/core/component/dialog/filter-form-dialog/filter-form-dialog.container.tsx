import * as React from 'react';

import { Dialog } from '../dialog.component';
import { FilterFormDialogActionBuilder } from '../../../action';
import { FormContainer } from '../../form';
import {
  DEFAULT_COMPACT_FORM_ENTITY,
  IFilterFormDialogContainerProps,
} from '../../../definition';
import {
  FormUtils,
  Mappers,
} from '../../../util';
import { GenericContainer } from '../../base/generic.container';

/**
 * @component-container-impl
 * @stable [01.08.2020]
 *
 * Please use the "Mappers.filterFormDialogContainerProps"
 */
export class FilterFormDialogContainer extends GenericContainer<IFilterFormDialogContainerProps> {

  /**
   * @stable [01.08.2020]
   * @param {IFilterFormDialogContainerProps} originalProps
   */
  constructor(originalProps: IFilterFormDialogContainerProps) {
    super(originalProps);

    this.onAcceptFilter = this.onAcceptFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
  }

  /**
   * @stable [23.04.2020]
   */
  public componentWillUnmount() {
    if (this.originalProps.autoReset) {
      this.dispatchPlainAction(FilterFormDialogActionBuilder.buildResetPlainAction(this.sectionName));
    }
  }

  /**
   * @stable [23.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      dialogConfiguration,
    } = originalProps;
    const {
      APPLY,
      CLEAR_ALL,
      CLOSE,
      FILTERS,
    } = this.settings.messages;

    return (
      <Dialog
        title={FILTERS}
        closeText={this.isFormTouched ? CLEAR_ALL : CLOSE}
        acceptText={APPLY}
        {...dialogConfiguration}
        ref={this.actualRef}
        acceptDisabled={!this.canAccept}
        onAccept={this.onAcceptFilter}
        onClose={this.onClearFilter}
      >
        <FormContainer
          formConfiguration={DEFAULT_COMPACT_FORM_ENTITY}
          {...Mappers.formContainerProps(originalProps)}
        >
          {this.originalChildren}
        </FormContainer>
      </Dialog>
    );
  }

  /**
   * @stable [23.04.2020]
   */
  private onAcceptFilter(): void {
    this.dispatchPlainAction(FilterFormDialogActionBuilder.buildAcceptPlainAction(this.sectionName));
  }

  /**
   * @stable [23.04.2020]
   */
  private onClearFilter(): void {
    if (this.isFormTouched) {
      this.dispatchPlainAction(FilterFormDialogActionBuilder.buildClearPlainAction(this.sectionName));
    }
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get canAccept(): boolean {
    const originalProps = this.originalProps;
    return FormUtils.isValid(originalProps) && this.isFormTouched; // The only default changes do not allow accepting (!)
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isFormTouched(): boolean {
    return FormUtils.isTouched(this.originalProps);
  }
}
