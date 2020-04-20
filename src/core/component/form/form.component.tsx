import * as React from 'react';
import * as R from 'ramda';

import {
  FormClassesEnum,
  IApiEntity,
  IBaseEvent,
  IButtonProps,
  IconsEnum,
  IFieldsPresets,
  IFormProps,
  IGenericEditableEntity,
  UniversalIdProviderContext,
} from '../../definition';
import {
  calc,
  cloneReactNodes,
  defValuesFilter,
  getFormFieldDisplayValue,
  getFormFieldOriginalValue,
  getFormFieldValue,
  ifNotNilThanValue,
  isActionsRendered,
  isBoolean,
  isCompact,
  isFn,
  isFormFieldChangeable,
  isFormFieldDisabled,
  isFormFieldReadOnly,
  isFormInProgress,
  isFormResettable,
  isFormSubmittable,
  isFormValid,
  isFull,
  isNewEntity,
  isObjectNotEmpty,
  isString,
  isValidateOnMount,
  joinClassName,
  mapApiEntity,
  notNilValuesFilter,
  objectValuesArrayFilter,
  orNull,
  selectChanges,
  selectError,
} from '../../util';
import {
  AnyT,
  IEntity,
} from '../../definitions.interface';
import { GenericComponent } from '../base';
import { Button } from '../button';
import { Field, IField } from '../field';
import { IFieldProps } from '../../configurations-definitions.interface';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';

export class Form extends GenericComponent<IFormProps, {}, HTMLFormElement> {

  @lazyInject(DI_TYPES.FieldsPresets) private readonly fieldsPresets: IFieldsPresets;

  /**
   * @stable [29.05.2018]
   * @param {IFormProps} props
   */
  constructor(props: IFormProps) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @stable [30.01.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {formId} = props;
    const nodes = this.formNodes;

    const formElement = (
      <form
        ref={this.selfRef}
        style={props.style}
        autoComplete='off'
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        className={this.className}>
        {
          isCompact(props)
            ? nodes
            : (
              <div className={FormClassesEnum.FORM_BODY}>
                {nodes}
              </div>
            )
        }
        {
          isActionsRendered(props) && (
            <div className={FormClassesEnum.FORM_ACTIONS}>
              {this.formActionsElement}
            </div>
          )
        }
      </form>
    );

    if (R.isNil(formId)) {
      return formElement;
    }

    return (
      <UniversalIdProviderContext.Provider
        value={formId}>
        {formElement}
      </UniversalIdProviderContext.Provider>
    );
  }

  /**
   * @stable [30.01.2020]
   */
  public componentDidMount(): void {
    if (isValidateOnMount(this.props)) {
      this.propsOnValid();
    }
  }

  /**
   * @stable [30.01.2020]
   */
  public submit(): void {
    const props = this.props;
    if (isFn(props.onSubmit)) {
      props.onSubmit(this.apiEntity);
    }
  }

  /**
   * @stable [03.02.2020]
   * @param {string} name
   * @param {AnyT} value
   */
  private onChange(name: string, value: AnyT): void {
    const {onChange} = this.props;
    if (isFn(onChange)) {
      onChange({name, value});
    }
    this.propsOnValid();
  }

  /**
   * @stable [03.02.2020]
   * @param {IField} field
   */
  private onFieldEmptyDictionary(field: IField): void {
    const {onEmptyDictionary} = this.props;

    if (isFn(onEmptyDictionary)) {
      onEmptyDictionary(field.props.bindDictionary, this.apiEntity);
    }
  }

  private onLoadDictionary(field: IField, items: AnyT): void {
    const props = this.props;

    if (props.onLoadDictionary) {
      props.onLoadDictionary(items, field.props.bindDictionary);
    }
  }

  /**
   * @stable [03.02.2020]
   */
  private propsOnValid(): void {
    const {onValid, valid} = this.props;

    if (isFn(onValid)) {
      onValid(isBoolean(valid) || this.selfRef.current.checkValidity());
    }
  }

  /**
   * @stable [30.01.2020]
   */
  private doSubmit(): void {
    this.onSubmit();
  }

  /**
   * @stable [03.02.2020]
   * @param {IBaseEvent} event
   */
  private onSubmit(event?: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);

    const {onBeforeSubmit} = this.props;
    const apiEntity = this.apiEntity;

    if (isFn(onBeforeSubmit)) {
      if (onBeforeSubmit(apiEntity) !== false) {
        this.submit();
      }
    } else {
      this.submit();
    }
  }

  /**
   * @stable [30.01.2020]
   * @param {IBaseEvent} event
   */
  private onReset(event: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);

    const onReset = this.props.onReset;
    if (isFn(onReset)) {
      onReset();
    }
  }

  /**
   * @stable [30.01.2020]
   * @returns {boolean}
   */
  private get isFormValid(): boolean {
    return isFormValid(this.props);
  }

  /**
   * @stable [23.03.2020]
   * @returns {boolean}
   */
  private get isFormSubmittable(): boolean {
    return isFormSubmittable(this.props);
  }

  /**
   * @stable [23.03.2020]
   * @returns {boolean}
   */
  private get isFormResettable(): boolean {
    return isFormResettable(this.props);
  }

  /**
   * @stable [03.02.2020]
   * @returns {boolean}
   */
  private get isFormOfNewEntity(): boolean {
    return isNewEntity(this.props.entity);
  }

  /**
   * @stable [25.09.2019]
   * @returns {boolean}
   */
  private get isFormBusy(): boolean {
    return isFormInProgress(this.props);
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
   * @stable [23.03.2020]
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldDisabled(field: IField): boolean {
    return isFormFieldDisabled(this.props, field.props);
  }

  /**
   * @stable [23.03.2020]
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldChangeable(field: IField): boolean {
    return isFormFieldChangeable(this.props, field.props);
  }

  /**
   * @stable [16.11.2019]
   * @param {IField} field
   * @returns {AnyT}
   */
  private getFieldValue(field: IField): AnyT {
    return getFormFieldValue(this.props, field.props);
  }

  /**
   * @stable [16.11.2019]
   * @param {IField} field
   * @returns {AnyT}
   */
  private getFieldOriginalValue(field: IField): AnyT {
    return getFormFieldOriginalValue(this.props, field.props);
  }

  /**
   * @stable [24.12.2019]
   * @param {IFieldProps} props
   * @param {IFieldProps} defaultProps
   * @returns {AnyT}
   */
  private getFieldDisplayValue(props: IFieldProps, defaultProps: IFieldProps): AnyT {
    return getFormFieldDisplayValue(this.props, props, defaultProps);
  }

  /**
   * @stable [03.02.2020]
   * @param {IField} field
   * @returns {IFieldProps}
   */
  private getPredefinedFieldProps(field: IField): IFieldProps {
    const props = this.fieldsPresets[field.props.name];

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
   * @stable [13.02.2020]
   * @returns {JSX.Element}
   */
  private get formActionsElement(): JSX.Element {
    const props = this.props;
    const actions = this.actions;
    const actualActions = isFn(props.actionsFactory) ? props.actionsFactory(actions) : actions;

    return (
      <React.Fragment>
        {actualActions
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

  /**
   * @stable [03.02.2020]
   * @returns {React.ReactNode[]}
   */
  private get formNodes(): React.ReactNode[] {
    return (
      cloneReactNodes<IFieldProps>(
        this,
        (field: IField) => {
          const fieldProps = field.props;
          const predefinedOptions = this.getPredefinedFieldProps(field);

          return defValuesFilter<IFieldProps, IFieldProps>(
            {
              value: this.getFieldValue(field),
              originalValue: this.getFieldOriginalValue(field),
              displayValue: this.getFieldDisplayValue(field, predefinedOptions),
              readOnly: this.isFieldReadOnly(field),
              disabled: this.isFieldDisabled(field),
              changeable: this.isFieldChangeable(field),
              changeForm: this.onChange,

              ...(
                fieldProps.bindDictionary && !isFn(fieldProps.onEmptyDictionary)
                  ? ({onEmptyDictionary: () => this.onFieldEmptyDictionary(field)})
                  : {}
              ),
              ...(
                fieldProps.bindDictionary && !isFn(fieldProps.onLoadDictionary)
                  ? ({onLoadDictionary: (itms) => this.onLoadDictionary(field, itms)})
                  : {}
              ),

              ...predefinedOptions,

              // The fields props have a higher priority
              ...defValuesFilter<IFieldProps, IFieldProps>({
                label: fieldProps.label,
                type: fieldProps.type,
                placeholder: fieldProps.placeholder,
                prefixLabel: fieldProps.prefixLabel,
              }),
            }
          );
        },
        (child) => Field.isPrototypeOf(child.type),
        (child) => (child.props as IFieldProps).rendered,
      )
    );
  }

  /**
   * @stable [03.02.2020]
   * @returns {boolean}
   */
  private get hasError(): boolean {
    return isObjectNotEmpty(selectError(this.form));
  }

  /**
   * @stable [13.02.2020]
   * @returns {IButtonProps[]}
   */
  private get actions(): IButtonProps[] {
    const props = this.props;
    const {
      buttonConfiguration = {},
      resetConfiguration = {},
      submitConfiguration = {},
    } = props;
    const messages = this.settings.messages;

    return objectValuesArrayFilter(
      props.resetActionRendered && notNilValuesFilter<IButtonProps, IButtonProps>({
        type: 'reset',
        icon: props.resetIcon || IconsEnum.TIMES,
        disabled: !this.isFormResettable,
        text: props.resetText || messages.RESET,
        ...buttonConfiguration,
        ...resetConfiguration,
        onClick: null,
      }),
      notNilValuesFilter<IButtonProps, IButtonProps>({
        type: 'submit',
        icon: this.isFormValid ? (props.submitIcon || 'ok-filled') : 'exclamation',
        raised: true,
        disabled: !this.isFormSubmittable,
        progress: this.isFormBusy,
        error: this.hasError,
        text: props.submitText || (this.isFormOfNewEntity ? messages.CREATE : messages.SAVE),
        ...buttonConfiguration,
        ...submitConfiguration,
        onClick: orNull(submitConfiguration.type === 'button', () => this.doSubmit),
      })
    );
  }

  /**
   * @stable [18.04.2020]
   * @returns {IApiEntity}
   */
  public get apiEntity(): IApiEntity {
    return mapApiEntity({
      changes: selectChanges(this.form),
      entity: this.entity,
      originalEntity: this.originalEntity,
    });
  }

  /**
   * @stable [18.04.2020]
   * @returns {string}
   */
  private get className(): string {
    const props = this.props;

    return joinClassName(
      FormClassesEnum.FORM,
      isFull(props) && FormClassesEnum.FULL_FORM,
      calc(props.className)
    );
  }

  /**
   * @stable [18.04.2020]
   * @returns {IGenericEditableEntity<IEntity>}
   */
  private get form(): IGenericEditableEntity<IEntity> {
    return this.props.form;
  }

  /**
   * @stable [18.04.2020]
   * @returns {IEntity}
   */
  private get originalEntity(): IEntity {
    return this.props.originalEntity;
  }

  /**
   * @stable [18.04.2020]
   * @returns {IEntity}
   */
  private get entity(): IEntity {
    return this.props.entity;
  }
}
