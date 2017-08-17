import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  IFormContainer,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  IFormContainerProps,
  FORM_CREATED_ENTITY_ID,
  IFormEntity
} from './form.interface';
import { Operation } from '../../operation/operation';
import { IApplicationState } from '../../store/store.interface';
import { IBaseContainerInternalState } from '../base/base.interface';
import { IApplicationPermissionState } from '../../permission/permission.interface';
import { BaseContainer } from '../base/base.container';
import { IApiRequest } from '../../api/api.interface';

export class FormContainer<TContainer extends IFormContainer<TEntity, TInternalProps, TInternalState>,
                           TAppState extends IApplicationState<TPermissionState, TPermissions>,
                           TEntity extends IFormEntity,
                           TInternalProps extends IFormContainerProps<TEntity>,
                           TInternalState extends IBaseContainerInternalState,
                           TPermissionState extends IApplicationPermissionState<TPermissions>,
                           TPermissions>
    extends BaseContainer<TContainer,
        TAppState,
        TInternalProps,
        TInternalState,
        TPermissionState,
        TPermissions>
    implements IFormContainer<TEntity, TInternalProps, TInternalState> {

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

  protected onSubmit(_, formData: TEntity): void {
    this.dispatchFormEvent(FORM_SUBMIT_ACTION_TYPE, {
      id: this.formEntityId,
      data: this.toSubmitData(formData),
      operation: Operation.create(FORM_SUBMIT_ACTION_TYPE)
    } as IApiRequest<TEntity>);
  }

  protected onDestroy(): void {
    this.dispatchFormEvent(FORM_DESTROY_ACTION_TYPE);
  }

  protected toSubmitData(entity: TEntity): TEntity {
    return entity;
  }

  protected get formEntityId(): number | string {
    return this.props.entity && this.props.entity.id || FORM_CREATED_ENTITY_ID;
  }
}
