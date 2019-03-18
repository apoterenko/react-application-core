import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import {
  cloneReactNodes,
  isString,
  isUndef,
  defValuesFilter,
  orNull,
  toClassName,
  orUndef,
  isFn,
  notNilValuesArrayFilter,
  ifNotFalseThanValue,
} from '../../util';
import { AnyT, BasicEventT, ReactElementT, IEntity } from '../../definitions.interface';
import { IEditableEntity } from '../../entities-definitions.interface';
import { IApiEntity } from '../../definition';
import { IFieldConfiguration, IFieldsConfigurations } from '../../configurations-definitions.interface';
import { BaseComponent } from '../base';
import { Button } from '../button';
import { lazyInject, DI_TYPES } from '../../di';
import { Field, IFieldInternalProps, IField } from '../field';
import { IForm, IFormProps, INITIAL_APPLICATION_FORM_STATE } from './form.interface';
import {
  isFormFieldReadOnly,
  isFormFieldDisabled,
  isFormOfNewEntity,
  isFormDirty,
  isFormValid,
  isFormSubmittable,
  isFormResettable,
  isFormFieldChangeable,
  isFormBusy,
} from './form.support';
import { FlexLayout } from '../layout';
import { IButtonProps } from '../../definition';
import { apiEntityFactory } from '../../api';

export class Form extends BaseComponent<IFormProps> implements IForm {

  public static defaultProps: IFormProps = {
    form: INITIAL_APPLICATION_FORM_STATE,
    validateOnMount: true,
  };
  private static logger = LoggerFactory.makeLogger('Form');

  @lazyInject(DI_TYPES.FieldsOptions) private fieldsOptions: IFieldsConfigurations;
  private readonly childrenMap: Map<ReactElementT, string | React.RefObject<IField>> = new Map();

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
    const nodes = (
      cloneReactNodes<IFieldInternalProps>(
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

  // TODO deprecated
  public componentWillUpdate(): void {
    this.childrenMap.clear();
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.childrenMap.clear();
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  public isFormValid(): boolean {
    return isFormValid(this.props);
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
    return toClassName(
      'rac-form',
      'rac-flex',
      'rac-flex-column',
      'rac-no-flex-shrink',
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
        const refObject = isString(uuidRef) ? null : uuidRef as React.RefObject<IField>;
        const otherFieldInstanceAtTheSameGroup = refObject.current || this.refs[uuidRef as string] as IField;

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
   * @stable [25.02.2019]
   * @returns {boolean}
   */
  private isFormBusy(): boolean {
    return isFormBusy(this.props);
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
          ...props.resetActionConfiguration,
          onClick: null,
        })
      ),
      {
        type: 'submit',
        icon: this.isFormValid() ? (props.actionIcon || 'ok-filled') : 'error_outline',
        raised: true,
        disabled: !this.isFormSubmittable(),
        progress: this.isFormBusy(),
        error: !R.isNil(this.form.error),
        text: props.actionText || (this.isFormOfNewEntity() ? messages.create : messages.save),
        ...props.buttonConfiguration,
        ...props.submitActionConfiguration,
        onClick: null,
      }
    );
    return (
      <React.Fragment>
        {(isFn(props.actionsProvider) ? props.actionsProvider(actions) : actions)
          .map(
            (action, index) => (
              <Button
                key={`form-action-${action.text || index}`}
                {...action}
                onClick={orNull(action.onClick !== null, () => () => action.onClick(this.apiEntity))}/>
            )
          )}
      </React.Fragment>
    );
  }
}
