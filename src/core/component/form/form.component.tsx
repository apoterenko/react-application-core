import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { cloneNodes, isString, isUndef, orNull, toClassName } from '../../util';
import { AnyT, BasicEventT, IEntity, ReactElementT } from '../../definition.interface';
import { BaseComponent } from '../../component/base';
import { Button } from '../../component/button';
import { lazyInject, DI_TYPES } from '../../di';
import { IApiEntity, ApiEntityT } from '../../api';
import { Operation } from '../../operation';
import {
  Field,
  IFieldInternalProps,
  FieldT,
  IFieldOptions,
  IFieldsOptions,
} from '../../component/field';

import {
  IFormPureComponent,
  FormInternalPropsT,
  INITIAL_APPLICATION_FORM_STATE,
  IForm,
} from './form.interface';

export class Form extends BaseComponent<IForm, FormInternalPropsT, {}> implements IForm {

  public static defaultProps: FormInternalPropsT = {
    form: INITIAL_APPLICATION_FORM_STATE,
    formOptions: {},
  };
  private static logger = LoggerFactory.makeLogger(Form);

  @lazyInject(DI_TYPES.FieldsOptions) private fieldsOptions: IFieldsOptions;
  private childrenMap: Map<ReactElementT, string> = new Map<ReactElementT, string>();

  constructor(props: FormInternalPropsT) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render(): JSX.Element {
    const formProps = this.props;
    const { form, formOptions } = formProps;

    return (
        <form ref='self'
              autoComplete='off'
              onReset={this.onReset}
              onSubmit={this.onSubmit}
              className={toClassName(
                            'rac-form',
                            'rac-flex',
                            'rac-flex-column',
                            'rac-flex-full',
                            formOptions.className
                        )}>
          <fieldset disabled={form.progress}
                    className='rac-fieldset app-row-layout rac-flex-full'>
            <section className={this.uiFactory.cardPrimary}>
              {
                cloneNodes<IFieldInternalProps>(
                    this,
                    (field: FieldT) => {
                      const fieldProps = field.props;
                      const predefinedOptions = this.getFieldPredefinedOptions(field);

                      return R.pickBy<IFieldInternalProps, IFieldInternalProps>(
                          (value, key) => !isUndef(value),
                          {
                            value: this.getFieldValue(field),
                            originalValue: this.getFieldOriginalValue(field),
                            displayValue: this.getFieldDisplayValue(field, predefinedOptions),
                            readOnly: this.isFieldReadOnly(field),
                            changeForm: this.onChange,

                            // Predefined options
                            ...predefinedOptions,

                            // The fields props have higher priority
                            ...R.pickBy<IFieldOptions, IFieldOptions>(
                                (value, key) => !isUndef(value), {
                                  label: fieldProps.label,
                                  type: fieldProps.type,
                                  placeholder: fieldProps.placeholder,
                                  prefixLabel: fieldProps.prefixLabel,
                                }
                            ),
                          }
                      );
                    },
                    (child) => Field.isPrototypeOf(child.type),
                    this.childrenMap,
                    (child) => (child.props as IFieldInternalProps).renderCondition,
                )
              }
            </section>
          </fieldset>
          {
            orNull(
                !formOptions.noActions,
                () => (
                    <section className={toClassName('rac-form-actions', this.uiFactory.cardActions)}>
                      {orNull(
                          formOptions.resetButton,
                          () => (
                              <Button type='reset'
                                      icon='clear_all'
                                      isRaised={true}
                                      disabled={!form.dirty}>
                                {this.t(formOptions.resetText || 'Reset')}
                              </Button>
                          )
                      )}
                      <Button type='submit'
                              icon={this.isFormValid
                                  ? (formOptions.actionIcon || 'save')
                                  : 'error_outline'}
                              isAccent={true}
                              isRaised={true}
                              disabled={!this.canSubmit}
                              progress={form.progress}
                              error={!R.isNil(form.error)}>
                        {this.t(formOptions.actionText || (this.apiEntity.isNew ? 'Create' : 'Save'))}
                      </Button>
                    </section>
                )
            )
          }
        </form>
    );
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.propsOnValid();
  }

  public componentWillUpdate(nextProps: Readonly<FormInternalPropsT>, nextState: Readonly<{}>, nextContext: {}): void {
    super.componentWillUpdate(nextProps, nextState, nextContext);
    this.childrenMap.clear();
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.childrenMap.clear();
  }

  public submit(): void {
    const props = this.props;

    if (props.onSubmit) {
      props.onSubmit(this.apiEntity);
    }
  }

  private onChange(name: string, value: AnyT, validationGroup: string): void {
    this.resetGroupFieldsErrors(name, validationGroup);
    if (this.props.onChange) {
      this.props.onChange(name, value);
    }
    this.propsOnValid();
  }

  private propsOnValid(): void {
    if (this.props.onValid) {
      this.props.onValid((this.refs.self as IFormPureComponent).checkValidity());
    }
  }

  private onSubmit(event: BasicEventT): void {
    const props = this.props;

    this.stopEvent(event);

    if (props.onBeforeSubmit) {
      props.onBeforeSubmit(this.apiEntity);
    } else {
      this.submit();
    }
  }

  private onReset(event: BasicEventT): void {
    this.stopEvent(event);

    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  private resetGroupFieldsErrors(name: string, validationGroup: string): void {
    if (!validationGroup) {
      return;
    }
    this.childrenMap.forEach((uuidRef, child) => {
      const childProps = child.props as IFieldInternalProps;
      const groupName = childProps.validationGroup;
      const fieldName = childProps.name;

      if (groupName === validationGroup && fieldName !== name) {
        const otherFieldInstanceAtTheSameGroup = this.refs[uuidRef] as FieldT;
        if (otherFieldInstanceAtTheSameGroup) {
          otherFieldInstanceAtTheSameGroup.resetError();
        } else {
          Form.logger.warn(`[$Form] The ref is not defined to the field with ${fieldName} name.`);
        }
      }
    });
  }

  private get apiEntity(): ApiEntityT {
    const { props } = this;
    const { entity } = props;
    const { changes } = props.form;
    const entityId = entity ? entity.id : null;

    const apiEntity0: ApiEntityT = (R.isNil(entityId)
            // You should use formMapper at least (simple form)
            ? { isNew: true, changes }

            // You should use formMapper and entityMapper at least (editable entity)
            : { isNew: false, changes, entity, id: entityId }
    );
    return {
      operation: Operation.create(),
      ...apiEntity0,
    };
  }

  private get isFormReadOnly(): boolean {
    const formOptions = this.props.formOptions;
    return formOptions && formOptions.readOnly === true;
  }

  private get isFormValid(): boolean {
    const form = this.props.form;
    return R.isNil(form.valid) || form.valid;
  }

  private get isFormDirty(): boolean {
    const form = this.props.form;
    return !R.isNil(form.dirty) && form.dirty;
  }

  private get canSubmit(): boolean {
    const form = this.props.form;
    return this.isFormValid && this.isFormDirty && (isUndef(form.saveable) || form.saveable);
  }

  private isFieldReadOnly(field: FieldT): boolean {
    const fieldProps = field.props;

    return R.isNil(fieldProps.readOnly)
        ? this.isFormReadOnly
        : fieldProps.readOnly;
  }

  private getFieldValue(field: FieldT): AnyT {
    const {form, entity} = this.props;
    const {changes} = form;
    const fieldProps = field.props;

    return isUndef(fieldProps.value) && fieldProps.name
        ? Reflect.get(entity || changes, fieldProps.name)
        : fieldProps.value;
  }

  private getFieldOriginalValue(field: FieldT): AnyT {
    const {originalEntity} = this.props;
    const fieldProps = field.props;
    return fieldProps.name && originalEntity ? Reflect.get(originalEntity, fieldProps.name) : undefined;
  }

  private getFieldDisplayValue(field: FieldT, fieldOptions: IFieldOptions): string {
    const {form, entity} = this.props;
    const {changes} = form;
    const fieldProps = field.props;

    const fieldDisplayName = fieldProps.displayName
        || (fieldOptions ? fieldOptions.displayName : null);

    return isUndef(fieldProps.displayValue) && fieldDisplayName
        ? Reflect.get(entity || changes, fieldDisplayName)
        : fieldProps.displayValue;
  }

  private getFieldPredefinedOptions(field: FieldT): IFieldOptions {
    const fieldProps = field.props;
    const fieldOptionsOrLabel = this.fieldsOptions[fieldProps.name];

    let fieldOptionsOrLabel0: IFieldOptions;
    if (isString(fieldOptionsOrLabel)) {
      // typings !
      fieldOptionsOrLabel0 = {label: fieldOptionsOrLabel as string};
    } else {
      fieldOptionsOrLabel0 = fieldOptionsOrLabel as IFieldOptions;
    }
    return fieldOptionsOrLabel0;
  }
}
