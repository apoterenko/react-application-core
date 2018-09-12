import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { cloneNodes, isString, isUndef, defValuesFilter, orNull, toClassName, orUndef } from '../../util';
import { AnyT, BasicEventT, ReactElementT, IEntity } from '../../definitions.interface';
import { IEditableEntity, IApiEntity } from '../../entities-definitions.interface';
import { IFieldConfiguration, IFieldsConfigurations } from '../../configurations-definitions.interface';
import { BaseComponent } from '../base';
import { Button } from '../button';
import { lazyInject, DI_TYPES } from '../../di';
import {
  Field,
  IFieldInternalProps,
  IField,
} from '../field';
import { IForm, IFormProps, INITIAL_APPLICATION_FORM_STATE } from './form.interface';
import {
  buildApiEntity,
  isFormFieldReadOnly,
  isFormFieldDisabled,
  isFormDisabled,
  isFormEditable,
  isFormNewEntity,
  isFormDirty,
  isFormValid,
  isFormSubmittable,
} from './form.support';

export class Form extends BaseComponent<IForm, IFormProps> implements IForm {

  public static defaultProps: IFormProps = {
    form: INITIAL_APPLICATION_FORM_STATE,
  };
  private static logger = LoggerFactory.makeLogger('Form');

  @lazyInject(DI_TYPES.FieldsOptions) private fieldsOptions: IFieldsConfigurations;
  private readonly childrenMap: Map<ReactElementT, string> = new Map<ReactElementT, string>();

  /**
   * @stable [29.05.2018]
   * @param {IFormProps} props
   */
  constructor(props: IFormProps) {
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
          <fieldset disabled={this.isFormDisabled()}
                    className='rac-fieldset rac-flex-full'>
            <section className='rac-section'>
              {
                cloneNodes<IFieldInternalProps>(
                    this,
                    (field: IField) => {
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
                              fieldProps.bindDictionary || fieldProps.onEmptyDictionary,
                              () => fieldProps.onEmptyDictionary || (() => this.onEmptyDictionary(field))
                            ),
                            onLoadDictionary: orUndef<(items: AnyT) => void>(
                              fieldProps.bindDictionary || fieldProps.onLoadDictionary,
                              (items) => fieldProps.onLoadDictionary || ((items0) => this.onLoadDictionary(field, items0))
                            ),

                            // Predefined options
                            ...predefinedOptions,

                            // The fields props have a higher priority
                            ...defValuesFilter<IFieldConfiguration, IFieldConfiguration>({
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
                    (child) => (child.props as IFieldInternalProps).rendered,
                )
              }
            </section>
          </fieldset>
          {
            orNull<JSX.Element>(
                !props.notUseActions,
                () => (
                    <section className={toClassName('rac-form-actions', this.uiFactory.cardActions)}>
                      {orNull<JSX.Element>(
                          props.useResetButton,
                          () => (
                              <Button icon='clear_all'
                                      {...props.buttonConfiguration}
                                      type='reset'
                                      disabled={!this.isFormDirty()}
                                      text={props.resetText || 'Reset'}/>
                          )
                      )}
                      <Button icon={this.isFormValid() ? (props.actionIcon || 'save') : 'error_outline'}
                              {...props.buttonConfiguration}
                              type='submit'
                              raised={true}
                              disabled={!this.isFormSubmittable()}
                              progress={this.form.progress}
                              error={!R.isNil(this.form.error)}
                              text={props.actionText || (isFormNewEntity(this.props) ? 'Create' : 'Save')}/>
                    </section>
                )
            )
          }
        </form>
    );
  }

  /**
   * @stable [12.09.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();
    this.propsOnValid();
  }

  public componentWillUpdate(nextProps: Readonly<IFormProps>, nextState: Readonly<{}>, nextContext: {}): void {
    super.componentWillUpdate(nextProps, nextState, nextContext);
    this.childrenMap.clear();
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.childrenMap.clear();
  }

  /**
   * @stable - 11.04.2018
   * @param {IApiEntity} apiEntity
   */
  public submit(apiEntity: IApiEntity): void {
    const props = this.props;
    if (props.onSubmit) {
      props.onSubmit(apiEntity);
    }
  }

  /**
   * @stable - 11.04.2018
   * @returns {IApiEntity}
   */
  public get apiEntity(): IApiEntity {
    return buildApiEntity(this.changes, this.entity, this.originalEntity);
  }

  private onChange(name: string, value: AnyT, validationGroup: string): void {

    if (this.props.onChange) {
      this.props.onChange({name, value});
    }
    this.resetGroupFieldsErrors(name, validationGroup);
    this.propsOnValid();
  }

  /**
   * @stable [04.08.2018]
   * @param {IField} field
   */
  private onEmptyDictionary(field: IField): void {
    const props = this.props;

    if (props.onEmptyDictionary) {
      props.onEmptyDictionary(field.props.bindDictionary, this.apiEntity);
    }
  }

  private onLoadDictionary(field: IField, items: AnyT): void {
    const props = this.props;

    if (props.onLoadDictionary) {
      props.onLoadDictionary(items, field.props.bindDictionary);
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
        const otherFieldInstanceAtTheSameGroup = this.refs[uuidRef] as IField;

        if (otherFieldInstanceAtTheSameGroup) {
          otherFieldInstanceAtTheSameGroup.resetError();
        } else {
          Form.logger.warn(`[$Form] The ref is not defined to the field with ${fieldName} name.`);
        }
      }
    });
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  private isFormDisabled(): boolean {
    return isFormDisabled(this.props);
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  private isFormValid(): boolean {
    return isFormValid(this.props);
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  private isFormDirty(): boolean {
    return isFormDirty(this.props);
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  private isFormEditable(): boolean {
    return isFormEditable(this.props);
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  private isFormSubmittable(): boolean {
    return isFormSubmittable(this.props);
  }

  /**
   * @stable - 11.04.2018
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldReadOnly(field: IField): boolean {
    return isFormFieldReadOnly(this.props, field.props);
  }

  /**
   * @stable - 11.04.2018
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldDisabled(field: IField): boolean {
    return isFormFieldDisabled(this.props, field.props);
  }

  private getFieldValue(field: IField): AnyT {
    const fieldProps = field.props;

    return isUndef(fieldProps.value) && fieldProps.name
        ? Reflect.get(this.entity || this.changes, fieldProps.name)
        : fieldProps.value;
  }

  private getFieldOriginalValue(field: IField): AnyT {
    const originalEntity = this.originalEntity;
    const fieldProps = field.props;
    return orUndef(fieldProps.name && originalEntity, () => Reflect.get(originalEntity, fieldProps.name));
  }

  private getFieldDisplayValue(field: IField, fieldConfiguration: IFieldConfiguration): string {
    const fieldProps = field.props;
    const fieldDisplayName = fieldProps.displayName || (fieldConfiguration ? fieldConfiguration.displayName : null);

    return isUndef(fieldProps.displayValue) && fieldDisplayName
        ? Reflect.get(this.entity || this.changes, fieldDisplayName)
        : fieldProps.displayValue;
  }

  private getFieldPredefinedOptions(field: IField): IFieldConfiguration {
    const fieldOptionsOrLabel = this.fieldsOptions[field.props.name];

    let fieldOptions: IFieldConfiguration;
    if (isString(fieldOptionsOrLabel)) {
      // typings !
      fieldOptions = {label: fieldOptionsOrLabel as string};
    } else {
      fieldOptions = fieldOptionsOrLabel as IFieldConfiguration;
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
   * @stable [10.06.2018]
   * @returns {IEntity}
   */
  private get originalEntity(): IEntity {
    return this.props.originalEntity;
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
  private get form(): IEditableEntity<IEntity> {
    return this.props.form;
  }
}
