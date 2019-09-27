import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import {
  cancelEvent,
  cloneReactNodes,
  defValuesFilter,
  ifNotFalseThanValue,
  ifNotNilThanValue,
  isFn,
  isFormFieldReadOnly,
  isFormWrapperEntityValid,
  isFormWrapperEntityBusy,
  isString,
  isUndef,
  joinClassName,
  notNilValuesArrayFilter,
  orNull,
  orUndef,
} from '../../util';
import { AnyT, IEntity } from '../../definitions.interface';
import { IApiEntity, IEditableEntity } from '../../definition';
import { IFieldConfiguration, IFieldsConfigurations } from '../../configurations-definitions.interface';
import { BaseComponent } from '../base';
import { Button } from '../button';
import { lazyInject, DI_TYPES } from '../../di';
import { Field, IFieldInternalProps, IField } from '../field';
import {
  isFormFieldDisabled,
  isFormOfNewEntity,
  isFormDirty,
  isFormSubmittable,
  isFormResettable,
  isFormFieldChangeable,
} from './form.support';
import { FlexLayout } from '../layout';
import {
  IBaseEvent,
  IButtonProps,
  IForm,
  IFormProps,
  INITIAL_FORM_ENTITY,
} from '../../definition';
import { apiEntityFactory } from '../../api';
import { IFieldProps } from '../../props-definitions.interface';

export class Form extends BaseComponent<IFormProps> implements IForm {

  public static defaultProps: IFormProps = {
    form: INITIAL_FORM_ENTITY,
    validateOnMount: true,
  };
  private static logger = LoggerFactory.makeLogger('Form');

  @lazyInject(DI_TYPES.FieldsOptions) private fieldsOptions: IFieldsConfigurations;
  private readonly childrenMap: Map<React.FunctionComponentElement<{ children: React.ReactChild[] }>,
    string | React.RefObject<IField>> = new Map();

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

    this.childrenMap.clear();
    const nodes = (
      cloneReactNodes<IFieldInternalProps>(
        this,
        (field: IField) => {
          const fieldProps = field.props;
          const predefinedOptions = this.getPredefinedFieldProps(field);

          return defValuesFilter<IFieldInternalProps, IFieldInternalProps>(
            {
              value: this.getFieldValue(field),
              originalValue: this.getFieldOriginalValue(field),
              displayValue: this.getFieldDisplayValue(field, predefinedOptions),
              readOnly: this.isFieldReadOnly(field),
              disabled: this.isFieldDisabled(field),
              changeable: this.isFieldChangeable(field),
              changeForm: this.onChange,

              // Dynamic linked dictionary callbacks
              onEmptyDictionary: orUndef<() => void>(
                fieldProps.bindDictionary || fieldProps.onEmptyDictionary,
                () => fieldProps.onEmptyDictionary || (() => this.onEmptyDictionary(field))
              ),
              onLoadDictionary: orUndef<(items: AnyT) => void>(
                fieldProps.bindDictionary || fieldProps.onLoadDictionary,
                () => fieldProps.onLoadDictionary || ((items0) => this.onLoadDictionary(field, items0))
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
    );

    return (
      <form
        ref='self'
        autoComplete='off'
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        className={this.getFormClassName()}>
        {
          props.compact
            ? nodes
            : (
              <div className='rac-form-body-wrapper'>
                <div className='rac-form-body'>
                  {nodes}
                </div>
              </div>
            )
        }
        {this.formActionsWrapperElement}
      </form>
    );
  }

  /**
   * @stable [12.09.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (this.props.validateOnMount) {
      this.propsOnValid();
    }
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
    return apiEntityFactory(this.changes, this.entity, this.originalEntity);
  }

  /**
   * @stable [25.02.2019]
   * @returns {string}
   */
  private getFormClassName(): string {
    const props = this.props;
    return joinClassName(
      'rac-form',
      'rac-flex',
      'rac-flex-column',
      'rac-flex-no-shrink',
      props.full !== false && 'rac-flex-full',
      props.className
    );
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

  private onSubmit(event: IBaseEvent): void {
    cancelEvent(event);

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

  private onReset(event: IBaseEvent): void {
    cancelEvent(event);

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
        const refObject = isString(uuidRef) ? null : uuidRef as React.RefObject<IField>;
        const otherFieldInstanceAtTheSameGroup = refObject && refObject.current || this.refs[uuidRef as string] as IField;

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
  private isFormValid(): boolean {
    return isFormWrapperEntityValid(this.props);
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
  private isFormSubmittable(): boolean {
    return isFormSubmittable(this.props);
  }

  /**
   * @stable [15.02.2019]
   * @returns {boolean}
   */
  private isFormResettable(): boolean {
    return isFormResettable(this.props);
  }

  /**
   * @stable [25.02.2019]
   * @returns {boolean}
   */
  private isFormOfNewEntity(): boolean {
    return isFormOfNewEntity(this.props);
  }

  /**
   * @stable [25.09.2019]
   * @returns {boolean}
   */
  private isFormBusy(): boolean {
    return isFormWrapperEntityBusy(this.props);
  }

  /**
   * @stable [25.09.2019]
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

  /**
   * @stable [16.11.2018]
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldChangeable(field: IField): boolean {
    return isFormFieldChangeable(this.props, field.props);
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

  /**
   * @stable [11.09.2019]
   * @param {IField} field
   * @returns {IFieldProps}
   */
  private getPredefinedFieldProps(field: IField): IFieldProps {
    const props = this.fieldsOptions[field.props.name];

    let resultProps: IFieldProps;
    if (isString(props)) {
      resultProps = {label: props as string};
    } else if (isFn(props)) {
      resultProps = (props as (field) => IFieldProps)(field);
    } else {
      resultProps = props as IFieldProps;
    }
    return resultProps;
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

  /**
   * @stable [25.02.2019]
   * @returns {JSX.Element}
   */
  private get formActionsWrapperElement(): JSX.Element {
    const props = this.props;
    return ifNotFalseThanValue<JSX.Element>(
      props.actionsRendered,
      () => (
        <FlexLayout
          full={false}
          row={true}
          justifyContentCenter={true}
          className='rac-form-actions'>
          {this.formActionsElement}
        </FlexLayout>
      )
    );
  }

  /**
   * @stable [25.02.2019]
   * @returns {JSX.Element}
   */
  private get formActionsElement(): JSX.Element {
    const props = this.props;
    const messages = this.settings.messages;
    const actions = notNilValuesArrayFilter<IButtonProps>(
      orNull(
        props.resetActionRendered,
        (): IButtonProps => ({
          type: 'reset',
          icon: props.resetIcon || 'close',
          disabled: !this.isFormResettable(),
          text: props.resetText || messages.reset,
          ...props.buttonConfiguration,
          ...props.resetConfiguration,
          onClick: null,
        })
      ),
      {
        type: 'submit',
        icon: this.isFormValid() ? (props.submitIcon || 'ok-filled') : 'exclamation',
        raised: true,
        disabled: !this.isFormSubmittable(),
        progress: this.isFormBusy(),
        error: !R.isNil(this.form.error),
        text: props.submitText || (this.isFormOfNewEntity() ? messages.create : messages.save),
        ...props.buttonConfiguration,
        ...props.submitConfiguration,
        onClick: null,
      }
    );
    return (
      <React.Fragment>
        {(isFn(props.actionsFactory) ? props.actionsFactory(actions) : actions)
          .map(
            (action, index) => (
              <Button
                key={`form-action-${action.text || index}`}
                {...action}
                onClick={ifNotNilThanValue(action.onClick, () => () => action.onClick(this.apiEntity))}/>
            )
          )}
      </React.Fragment>
    );
  }
}
