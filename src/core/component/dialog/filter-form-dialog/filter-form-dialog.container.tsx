import * as React from 'react';
import * as R from 'ramda';

import { Dialog } from '../dialog.component';
import { FilterFormDialogActionBuilder } from '../../../action';
import { FormContainer } from '../../form';
import {
  DEFAULT_COMPACT_FORM_ENTITY,
  IFilterFormDialogContainerProps,
} from '../../../definition';
import {
  isTouched,
  mapFormContainerProps,
  selectFormEditableEntityChanges,
} from '../../../util';
import { GenericContainer } from '../../base/generic.container';

export class FilterFormDialogContainer
  extends GenericContainer<IFilterFormDialogContainerProps<React.RefObject<Dialog>>> {

  /**
   * @stable [10.03.2019]
   * @param {IFilterFormDialogContainerProps} props
   */
  constructor(props: IFilterFormDialogContainerProps<React.RefObject<Dialog>>) {
    super(props);
    this.onAcceptFilter = this.onAcceptFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
  }

  /**
   * @stable [23.04.2020]
   */
  public componentWillUnmount() {
    if (this.props.autoReset) {
      this.dispatchPlainAction(FilterFormDialogActionBuilder.buildResetPlainAction(this.props.sectionName));
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
        ref={props.forwardedRef}
        title={FILTERS}
        closeText={this.haveFilterChangesOrIsTouched ? CLEAR_ALL : CLOSE}
        acceptText={APPLY}
        acceptDisabled={!this.haveFilterChanges}
        onAccept={this.onAcceptFilter}
        onClose={this.onClearFilter}
      >
        <FormContainer
          formConfiguration={DEFAULT_COMPACT_FORM_ENTITY}
          {...mapFormContainerProps(props)}
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
    this.dispatchPlainAction(FilterFormDialogActionBuilder.buildAcceptPlainAction(this.props.sectionName));
  }

  /**
   * @stable [23.04.2020]
   */
  private onClearFilter(): void {
    if (this.haveFilterChangesOrIsTouched) {
      this.dispatchPlainAction(FilterFormDialogActionBuilder.buildClearPlainAction(this.props.sectionName));
    }
  }

  /**
   * @stable [23.04.2020]
   * @returns {boolean}
   */
  private get haveFilterChangesOrIsTouched(): boolean {
    return this.haveFilterChanges || isTouched(this.props.form);
  }

  /**
   * @stable [23.04.2020]
   * @returns {boolean}
   */
  private get haveFilterChanges(): boolean {
    return !R.isEmpty(selectFormEditableEntityChanges(this.props));
  }
}
