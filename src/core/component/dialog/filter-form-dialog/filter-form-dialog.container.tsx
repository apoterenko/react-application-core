import * as React from 'react';

import { Dialog } from '../dialog.component';
import { FilterFormDialogActionBuilder } from '../../../action';
import { FormContainer } from '../../form';
import {
  DEFAULT_PRESETS_COMPACT_FORM_ENTITY,
  IFilterFormDialogContainerProps,
} from '../../../definition';
import {
  FormUtils,
  Mappers,
} from '../../../util';
import { GenericContainer } from '../../base/generic.container';

/**
 * @component-container-impl
 * @stable [09.05.2020]
 *
 * Please use the "Mappers.filterFormDialogContainerProps"
 */
export class FilterFormDialogContainer extends GenericContainer<IFilterFormDialogContainerProps> {

  /**
   * @stable [23.04.2020]
   * @param {IFilterFormDialogContainerProps} props
   */
  constructor(props: IFilterFormDialogContainerProps) {
    super(props);

    this.onAcceptFilter = this.onAcceptFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
  }

  /**
   * @stable [23.04.2020]
   */
  public componentWillUnmount() {
    if (this.props.autoReset) {
      this.dispatchPlainAction(FilterFormDialogActionBuilder.buildResetPlainAction(this.sectionName));
    }
  }

  /**
   * @stable [23.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {
      APPLY,
      CLEAR_ALL,
      CLOSE,
      FILTERS,
    } = this.settings.messages;

    return (
      <Dialog
        ref={this.actualRef}
        title={FILTERS}
        closeText={this.isFormTouched ? CLEAR_ALL : CLOSE}
        acceptText={APPLY}
        acceptDisabled={!this.canAccept}
        onAccept={this.onAcceptFilter}
        onClose={this.onClearFilter}
      >
        <FormContainer
          formConfiguration={DEFAULT_PRESETS_COMPACT_FORM_ENTITY}
          {...Mappers.formContainerProps(props)}
        >
          {props.children}
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
    const props = this.props;
    return FormUtils.isValid(props) && this.isFormTouched; // The only default changes do not allow accepting (!)
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isFormTouched(): boolean {
    return FormUtils.isTouched(this.props);
  }
}
