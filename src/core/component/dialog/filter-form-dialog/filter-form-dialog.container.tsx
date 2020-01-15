import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../../definitions.interface';
import { Dialog } from '../dialog.component';
import { FilterFormDialogActionBuilder } from '../../../action';
import { FormContainer } from '../../form';
import { IFilterFormDialogContainerProps } from '../../../definition';
import { isTouched } from '../../../util';
import { UniversalContainer } from '../../base/universal.container';

export class FilterFormDialogContainer
  extends UniversalContainer<IFilterFormDialogContainerProps<React.RefObject<Dialog<AnyT>>>> {

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
    if (this.props.autoReset) {
      this.dispatchCustomType(FilterFormDialogActionBuilder.buildResetActionType(this.props.sectionName));
    }
  }

  /**
   * @stable [10.03.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {APPLY, CLEAR_ALL, CLOSE, FILTERS} = this.settings.messages;

    return (
      <Dialog
        ref={props.forwardedRef}
        title={FILTERS}
        closeText={this.haveFilterChangesOrIsTouched ? CLEAR_ALL : CLOSE}
        acceptText={APPLY}
        acceptDisabled={!this.haveFilterChanges}
        onAccept={this.onAcceptFilter}
        onClose={this.onClearFilter}>
        <FormContainer
          formConfiguration={{
            actionsRendered: false,
            compact: true,
          }}
          {...props}
        />
      </Dialog>
    );
  }

  /**
   * @stable [10.03.2019]
   */
  private onAcceptFilter(): void {
    this.dispatchCustomType(FilterFormDialogActionBuilder.buildAcceptActionType(this.props.sectionName));
  }

  /**
   * @stable [10.03.2019]
   */
  private onClearFilter(): void {
    if (this.haveFilterChangesOrIsTouched) {
      this.dispatchCustomType(FilterFormDialogActionBuilder.buildClearActionType(this.props.sectionName));
    }
  }

  /**
   * @stable [16.01.2020]
   * @returns {boolean}
   */
  private get haveFilterChangesOrIsTouched(): boolean {
    return this.haveFilterChanges || isTouched(this.props.form);
  }

  /**
   * @stable [16.01.2020]
   * @returns {boolean}
   */
  private get haveFilterChanges(): boolean {
    return !R.isEmpty(this.props.form.changes);
  }
}
