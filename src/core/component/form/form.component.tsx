import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { cloneNodes, isString, isUndef, defValuesFilter, orNull, toClassName, orUndef, isNumber } from '../../util';
import { AnyT, BasicEventT, ReactElementT, IEntity } from '../../definitions.interface';
import { IFormEntity, IDefaultApiEntity } from '../../entities-definitions.interface';
import { BaseComponent } from '../base';
import { Button } from '../button';
import { lazyInject, DI_TYPES } from '../../di';
import {
  Field,
  IFieldInternalProps,
  FieldT,
  IFieldOptions,
  IFieldsOptions,
} from '../field';
import { IForm, IFormInternalProps } from './form.interface';
import { INITIAL_APPLICATION_FORM_STATE } from './form-reducer.interface';
import { buildApiEntity } from './form.support';

export class Form extends BaseComponent<IForm, IFormInternalProps, {}> implements IForm {

  public static defaultProps: IFormInternalProps = {
    form: INITIAL_APPLICATION_FORM_STATE,
  };
  private static logger = LoggerFactory.makeLogger(Form);

  @lazyInject(DI_TYPES.FieldsOptions) private fieldsOptions: IFieldsOptions;
  private readonly childrenMap: Map<ReactElementT, string> = new Map<ReactElementT, string>();

  constructor(props: IFormInternalProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;

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
                            props.className
                        )}>
          <fieldset disabled={this.isFormDisabled}
                    className='rac-fieldset rac-flex-full'>
            <section className='rac-section'>
              {
                cloneNodes<IFieldInternalProps>(
                    this,
                    (field: FieldT) => {
                      const fieldProps = field.props;
                      const predefinedOptions = this.getFieldPredefinedOptions(field);

                      return defValuesFilter<IFieldInternalProps, IFieldInternalProps>(
                          {
                            value: this.getFieldValue(field),
                            originalValue: this.getFieldOriginalValue(field),
                            displayValue: this.getFieldDisplayValue(field, predefinedOptions),
                            readOnly: this.isFieldReadOnly(field),
                            disabled: this.isFieldDisabled(field),
                            changeForm: this.onChange,

                            // Dynamic linked dictionary callbacks
                            onEmptyDictionary: orUndef<() => void>(
                              fieldProps.bindToDictionary || fieldProps.onEmptyDictionary,
                              () => fieldProps.onEmptyDictionary || (() => this.onEmptyDictionary(field))
                            ),
                            onLoadDictionary: orUndef<(items: AnyT) => void>(
                              fieldProps.bindToDictionary || fieldProps.onLoadDictionary,
                              (items) => fieldProps.onLoadDictionary || ((items0) => this.onLoadDictionary(field, items0))
                            ),

                            // Predefined options
                            ...predefinedOptions,

                            // The fields props have a higher priority
                            ...defValuesFilter<IFieldOptions, IFieldOptions>({
                              label: fieldProps.label,
                              type: fieldProps.type,
                              placeholder: fieldProps.placeholder,
                              prefixLabel: fieldProps.prefixLabel,
                            }),
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
                !props.notUseActions,
                () => (
                    <section className={toClassName('rac-form-actions', this.uiFactory.cardActions)}>
                      {orNull(
                          props.useResetButton,
                          () => (
                              <Button type='reset'
                                      icon='clear_all'
                                      raised={true}
                                      disabled={!this.isFormDirty}>
                                {this.t(props.resetText || 'Reset')}
                              </Button>
                          )
                      )}
                      <Button type='submit'
                              icon={this.isFormValid
                                  ? (props.actionIcon || 'save')
                                  : 'error_outline'}
                              accent={true}
                              raised={true}
                              disabled={!this.canSubmit}
                              progress={this.form.progress}
                              error={!R.isNil(this.form.error)}>
                        {this.t(props.actionText || (this.newEntity ? 'Create' : 'Save'))}
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

  public componentWillUpdate(nextProps: Readonly<IFormInternalProps>, nextState: Readonly<{}>, nextContext: {}): void {
    super.componentWillUpdate(nextProps, nextState, nextContext);
    this.childrenMap.clear();
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.childrenMap.clear();
  }

  /**
   * @stable - 11.04.2018
   * @param {IDefaultApiEntity} apiEntity
   */
  public submit(apiEntity: IDefaultApiEntity): void {
    const props = this.props;
    if (props.onSubmit) {
      props.onSubmit(apiEntity);
    }
  }

  /**
   * @stable - 11.04.2018
   * @returns {IDefaultApiEntity}
   */
  public get apiEntity(): IDefaultApiEntity {
    return buildApiEntity(this.changes, this.entity);
  }

  private onChange(name: string, value: AnyT, validationGroup: string): void {
    this.resetGroupFieldsErrors(name, validationGroup);
    if (this.props.onChange) {
      this.props.onChange({name, value});
    }
    this.propsOnValid();
  }

  private onEmptyDictionary(field: FieldT): void {
    const props = this.props;

    if (props.onEmptyDictionary) {
      props.onEmptyDictionary(field.props.bindToDictionary);
    }
  }

  private onLoadDictionary(field: FieldT, items: AnyT): void {
    const props = this.props;

    if (props.onLoadDictionary) {
      props.onLoadDictionary(items, field.props.bindToDictionary);
    }
  }

  private propsOnValid(): void {
    if (this.props.onValid) {
      this.props.onValid((this.refs.self as HTMLFormElement).checkValidity());
    }
  }

  /**
   * @stable - 11.04.2018
   * @param {BasicEventT} event
   */
  private onSubmit(event: BasicEventT): void {
    this.stopEvent(event);

    const props = this.props;
    const apiEntity = this.apiEntity;
    if (props.onBeforeSubmit) {
      if (props.onBeforeSubmit(apiEntity) !== false) {
        this.submit(apiEntity);
      }
    } else {
      this.submit(apiEntity);
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

  private get isFormReadOnly(): boolean {
    return this.props.readOnly === true;
  }

  /**
   * @stable - 31.03.2018
   * @returns {boolean}
   */
  private get isFormDisabled(): boolean {
    return this.props.disabled === true || this.props.form.progress;
  }

  private get isFormValid(): boolean {
    const form = this.props.form;
    return R.isNil(form.valid) || form.valid;
  }

  /**
   * @stable - 31.03.2018
   * @returns {boolean}
   */
  private get isFormDirty(): boolean {
    return this.props.alwaysDirty || this.props.form.dirty === true;
  }

  /**
   * @stable - 31.03.2018
   * @returns {boolean}
   */
  private get isFormSubmittable(): boolean {
    return R.isNil(this.props.submittable) || this.props.submittable === true;
  }

  /**
   * @stable - 31.03.2018
   * @returns {boolean}
   */
  private get canSubmit(): boolean {
    return this.isFormValid
        && this.isFormSubmittable
        && this.isFormDirty
        && !this.isFormDisabled;
  }

  private isFieldReadOnly(field: FieldT): boolean {
    const fieldProps = field.props;

    return R.isNil(fieldProps.readOnly)
        ? this.isFormReadOnly
        : fieldProps.readOnly;
  }

  private isFieldDisabled(field: FieldT): boolean {
    const fieldProps = field.props;

    return R.isNil(fieldProps.disabled)
        ? this.isFormDisabled
        : fieldProps.disabled;
  }

  private getFieldValue(field: FieldT): AnyT {
    const fieldProps = field.props;

    return isUndef(fieldProps.value) && fieldProps.name
        ? Reflect.get(this.entity || this.changes, fieldProps.name)
        : fieldProps.value;
  }

  private getFieldOriginalValue(field: FieldT): AnyT {
    const originalEntity = this.props.originalEntity;
    const fieldProps = field.props;
    return orUndef(fieldProps.name && originalEntity, () => Reflect.get(originalEntity, fieldProps.name));
  }

  private getFieldDisplayValue(field: FieldT, fieldOptions: IFieldOptions): string {
    const fieldProps = field.props;
    const fieldDisplayName = fieldProps.displayName || (fieldOptions ? fieldOptions.displayName : null);

    return isUndef(fieldProps.displayValue) && fieldDisplayName
        ? Reflect.get(this.entity || this.changes, fieldDisplayName)
        : fieldProps.displayValue;
  }

  private getFieldPredefinedOptions(field: FieldT): IFieldOptions {
    const fieldOptionsOrLabel = this.fieldsOptions[field.props.name];

    let fieldOptions: IFieldOptions;
    if (isString(fieldOptionsOrLabel)) {
      // typings !
      fieldOptions = {label: fieldOptionsOrLabel as string};
    } else {
      fieldOptions = fieldOptionsOrLabel as IFieldOptions;
    }
    return fieldOptions;
  }

  /**
   * @stable - 01.04.2018
   * @returns {IEntity}
   */
  private get entity(): IEntity {
    return this.props.entity;
  }

  /**
   * @stable - 11.04.2018
   * @returns {IEntity}
   */
  private get newEntity(): boolean {
    return this.entity && isNumber(this.entity.id);
  }

  /**
   * @stable - 01.04.2018
   * @returns {IEntity}
   */
  private get changes(): IEntity {
    return this.form.changes;
  }

  /**
   * @stable - 01.04.2018
   * @returns {IEntity}
   */
  private get form(): IFormEntity<IEntity> {
    return this.props.form;
  }
}
