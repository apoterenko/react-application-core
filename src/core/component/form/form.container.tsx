import * as React from 'react';
import * as R from 'ramda';

import { IApiEntity } from '../../api';
import { Operation } from '../../operation';
import { AnyT, IEntity } from '../../definition.interface';
import { BaseContainer } from '../../component/base';
import { Form, IFormContainerInternalProps } from '../../component/form';

import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
} from './form.interface';

export class FormContainer extends BaseContainer<IFormContainerInternalProps<IEntity>, {}> {

  constructor(props: IFormContainerInternalProps<IEntity>) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  public componentWillUnmount(): void {
    this.dispatch(FORM_DESTROY_ACTION_TYPE);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <Form onChange={this.onChange}
              onSubmit={this.onSubmit}
              onReset={this.onReset}
              onValid={this.onValid}
              {...props}>
          {props.children}
        </Form>
    );
  }

  private onChange(name: string, value: AnyT): void {
    if (name) {
      this.dispatchFormChangeEvent(name, value);
    }
  }

  private dispatchFormChangeEvent(field: string, value: AnyT): void {
    this.dispatch(FORM_CHANGE_ACTION_TYPE, { field, value });
  }

  private onValid(valid: boolean): void {
    this.dispatch(FORM_VALID_ACTION_TYPE, { valid });
  }

  private onReset(): void {
    this.dispatch(FORM_RESET_ACTION_TYPE);
  }

  private onSubmit(): void {
    const { props } = this;
    const { entity } = props;
    const { changes } = props.form;
    const entityId = entity ? entity.id : null;

    const apiEntity0: IApiEntity<IEntity> = (R.isNil(entityId)
            // You should use formMapper at least (simple form)
            ? { isNew: true, changes }

            // You should use formMapper and entityMapper at least (editable entity)
            : { isNew: false, changes, entity, id: entityId }
    );

    const apiEntity: IApiEntity<IEntity> = {
      operation: Operation.create(FORM_SUBMIT_ACTION_TYPE),
      ...apiEntity0,
    };
    this.dispatch(FORM_SUBMIT_ACTION_TYPE, apiEntity);
  }
}
