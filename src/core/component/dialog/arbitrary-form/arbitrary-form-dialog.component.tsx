import * as React from 'react';

import { Dialog } from '../dialog.component';
import { IArbitraryFormDialogProps, IArbitraryFormDialogState } from './arbitrary-form-dialog.interface';
import { IFieldChangeEntity, IEditableEntity } from '../../../entities-definitions.interface';
import {
  Form,
  FormActionBuilder,
  formReducer,
  INITIAL_APPLICATION_FORM_STATE,
  isFormSubmittable,
} from '../../form';
import { uuid } from '../../../util';
import { AnyT } from '../../../definitions.interface';

export class ArbitraryFormDialog extends Dialog<IArbitraryFormDialogProps,
                                                IArbitraryFormDialogState> {

  private static REDUCER_FORM_SECTION = uuid();

  /**
   * @stable [03.08.2018]
   * @param {IArbitraryFormDialogProps} props
   */
  constructor(props: IArbitraryFormDialogProps) {
    super(props);

    this.onFormValid = this.onFormValid.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.state = {form: INITIAL_APPLICATION_FORM_STATE};
  }

  /**
   * @stable [03.08.2018]
   */
  public activate(callback: () => void): void {
    super.activate(callback);
    this.setState({form: INITIAL_APPLICATION_FORM_STATE}, callback);
  }

  /**
   * @stable [03.08.2018]
   */
  public onAccept(): void {
    const props = this.props;
    if (props.onAccept) {
      props.onAccept(this.state.form.changes);
    }
  }

  /**
   * @stable [03.08.2018]
   * @returns {React.ReactNode}
   */
  protected getDialogBodyElement(): React.ReactNode {
    const props = this.props;

    return (
      <Form {...props.formConfiguration}
            form={this.state.form}
            actionsRendered={false}
            onChange={this.onFormChange}>
        {super.getDialogBodyElement()}
      </Form>
    );
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  protected isAcceptButtonDisabled(): boolean {
    return super.isAcceptButtonDisabled() || !isFormSubmittable(this.state);
  }

  /**
   * @stable [03.08.2018]
   * @param {boolean} valid
   */
  private onFormValid(valid: boolean): void {
    this.setState({form: this.buildNextFormState({valid})});
  }

  /**
   * @stable [03.08.2018]
   * @param {IFieldChangeEntity} payload
   */
  private onFormChange(payload: IFieldChangeEntity): void {
    this.setState({form: this.buildNextFormState(payload)});
  }

  /**
   * @stable [03.08.2018]
   * @param {AnyT} payload
   * @returns {IEditableEntity}
   */
  private buildNextFormState(payload: AnyT): IEditableEntity {
    // Redux State emulating
    return formReducer(this.state.form, {
      type: FormActionBuilder.buildChangeActionType(ArbitraryFormDialog.REDUCER_FORM_SECTION),
      data: {
        section: ArbitraryFormDialog.REDUCER_FORM_SECTION,
        ...payload,
      },
    });
  }
}
