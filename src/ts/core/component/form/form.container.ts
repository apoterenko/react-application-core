import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  IFormContainer,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  IFormContainerProps,
  FORM_CREATED_ENTITY_ID
} from './form.interface';
import { Operation } from '../../operation/operation';
import { IApplicationState } from '../../store/store.interface';
import { IKeyValue } from '../../definition.interface';
import { IBaseContainerInternalState } from '../base/base.interface';
import { IApplicationPermissionState } from '../../permission/permission.interface';
import { BaseContainer } from '../base/base.container';

export class FormContainer<TContainer extends IFormContainer<TChanges, TInternalProps, TInternalState>,
                           TAppState extends IApplicationState<TPermissionState, TPermissions>,
                           TChanges extends IKeyValue,
                           TInternalProps extends IFormContainerProps<TChanges>,
                           TInternalState extends IBaseContainerInternalState,
                           TPermissionState extends IApplicationPermissionState<TPermissions>,
                           TPermissions>
    extends BaseContainer<TContainer,
        TAppState,
        TInternalProps,
        TInternalState,
        TPermissionState,
        TPermissions>
    implements IFormContainer<TChanges, TInternalProps, TInternalState> {

  constructor(props: TInternalProps, sectionName: string) {
    super(props, sectionName);

    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  dispatchFormEvent(type: string, params?: any): void {
    this.dispatch(type, { section: this.sectionName, ...params });
  }

  componentWillUnmount(): void {
    super.componentWillUnmount();
    this.onDestroy();
  }

  protected onChange(event: { target: { name: string, value: any } }): void {
    const target = event.target;
    this.dispatchFormEvent(FORM_CHANGE_ACTION_TYPE, { field: target.name, value: target.value });
  }

  protected onValid(valid: boolean): void {
    this.dispatchFormEvent(FORM_VALID_ACTION_TYPE, { valid: valid });
  }

  protected onSubmit(_, changes: TChanges): void {
    this.dispatchFormEvent(FORM_SUBMIT_ACTION_TYPE, {
      id: this.formEntityId,
      changes: this.toSubmitData(changes),
      operation: Operation.create(FORM_SUBMIT_ACTION_TYPE)
    });
  }

  protected onDestroy(): void {
    this.dispatchFormEvent(FORM_DESTROY_ACTION_TYPE);
  }

  protected toSubmitData(values: TChanges): TChanges | IKeyValue {
    return values;
  }

  protected get formEntityId(): number | string {
    return FORM_CREATED_ENTITY_ID;
  }
}
