import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../../definitions.interface';
import { BaseContainer } from '../../base';
import { FormContainer } from '../../form';
import {
  FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE,
  FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE,
  FILTER_FORM_DIALOG_RESET_ACTION_TYPE,
  IFilterFormDialogContainerProps,
} from './filter-form-dialog.interface';
import { Dialog } from '../dialog.component';

export class FilterFormDialogContainer
  extends BaseContainer<IFilterFormDialogContainerProps<React.RefObject<Dialog<AnyT>>>> {

  /**
   * @stable [10.03.2019]
   * @param {IFilterFormDialogContainerProps} props
   */
  constructor(props: IFilterFormDialogContainerProps<React.RefObject<Dialog<AnyT>>>) {
    super(props);
    this.onAcceptFilter = this.onAcceptFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
  }

  /**
   * @stable [12.03.2019]
   */
  public componentWillUnmount() {
    this.dispatchFrameworkAction(FILTER_FORM_DIALOG_RESET_ACTION_TYPE);
  }

  /**
   * @stable [10.03.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const noFilterChanges = this.noFilterChanges;
    const messages = this.settings.messages;
    return (
      <Dialog
        ref={props.forwardedRef}
        title={this.settings.messages.filtersMessage}
        closeMessage={noFilterChanges ? messages.closeMessage : messages.clearAllMessage}
        acceptMessage={messages.applyMessage}
        acceptDisabled={noFilterChanges}
        onAccept={this.onAcceptFilter}
        onClose={this.onClearFilter}>
        <FormContainer
          formConfiguration={{actionsRendered: false}}
          {...props}
        />
      </Dialog>
    );
  }

  /**
   * @stable [10.03.2019]
   */
  private onAcceptFilter(): void {
    this.dispatchFrameworkAction(FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE);
  }

  /**
   * @stable [10.03.2019]
   */
  private onClearFilter(): void {
    if (!this.noFilterChanges) {
      this.dispatchFrameworkAction(FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE);
    }
  }

  /**
   * @stable [12.03.2019]
   * @returns {boolean}
   */
  private get noFilterChanges(): boolean {
    return R.isEmpty(this.props.form.changes);
  }
}
