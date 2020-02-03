import * as React from 'react';
import * as R from 'ramda';

import {
  IApiEntity,
  IBaseEvent,
  IButtonProps,
  IEditableEntity,
  IFieldsPresets,
  IForm,
  IFormProps,
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
  isFormFieldReadOnly,
  isFormInProgress,
  isFormSubmittable,
  isFormValid,
  isNewEntity,
  isString,
  isValidateOnMount,
  joinClassName,
  mapApiEntity,
  notNilValuesArrayFilter,
  orNull,
  selectEditableEntity,
  selectEditableEntityChanges,
  selectError,
} from '../../util';
import { AnyT, IEntity } from '../../definitions.interface';
import { BaseComponent } from '../base';
import { Button } from '../button';
import { Field, IField } from '../field';
import { IFieldProps } from '../../configurations-definitions.interface';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  isFormFieldChangeable,
  isFormFieldDisabled,
  isFormResettable,
} from './form.support';

export class Form extends BaseComponent<IFormProps> implements IForm {

  @lazyInject(DI_TYPES.FieldsPresets) private readonly fieldsPresets: IFieldsPresets;

  /**
   * @stable [29.05.2018]
   * @param {IFormProps} props
   */
  constructor(props: IFormProps) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onChange = this.onChange.bind(this);
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
        autoComplete='off'
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        className={this.formClassName}>
        {
          isCompact(props)
            ? nodes
            : (
              <div className='rac-form__body'>
                {nodes}
              </div>
            )
        }
        {
          isActionsRendered(props) && (
            <div className='rac-form__actions'>
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
    super.componentDidMount();

    if (isValidateOnMount(this.props)) {
      this.propsOnValid();
    }
  }

  /**
   * @stable [30.01.2020]
   * @param {IApiEntity} apiEntity
   */
  public submit(apiEntity: IApiEntity): void {
    const props = this.props;
    if (isFn(props.onSubmit)) {
      props.onSubmit(apiEntity);
    }
  }

  /**
   * @stable [30.01.2020]
   * @returns {IApiEntity}
   */
  public get apiEntity(): IApiEntity {
    const props = this.props;
    const {entity, originalEntity} = props;
    return mapApiEntity({changes: selectEditableEntityChanges(props), entity, originalEntity});
  }

  /**
   * @stable [30.01.2020]
   * @returns {HTMLFormElement}
   */
  public getSelf(): HTMLFormElement {
    return super.getSelf() as HTMLFormElement;
  }

  /**
   * @stable [25.02.2019]
   * @returns {string}
   */
  private get formClassName(): string {
    const props = this.props;
    return joinClassName(
      'rac-form',
      'rac-flex',
      'rac-flex-column',
      'rac-flex-no-shrink',
      props.full !== false && 'rac-flex-full',
      calc(props.className)
    );
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
      onValid(isBoolean(valid) || this.getSelf().checkValidity());
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
        this.submit(apiEntity);
      }
    } else {
      this.submit(apiEntity);
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
  private isFormValid(): boolean {
    return isFormValid(this.props);
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
   * @stable [03.02.2020]
   * @returns {boolean}
   */
  private isFormOfNewEntity(): boolean {
    return isNewEntity(this.props.entity);
  }

  /**
   * @stable [25.09.2019]
   * @returns {boolean}
   */
  private isFormBusy(): boolean {
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
   * @stable [25.02.2019]
   * @returns {JSX.Element}
   */
  private get formActionsElement(): JSX.Element {
    const props = this.props;
    const submitConfiguration = props.submitConfiguration || {};
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
        error: this.hasError,
        text: props.submitText || (this.isFormOfNewEntity() ? messages.create : messages.save),
        ...props.buttonConfiguration,
        ...submitConfiguration,
        onClick: orNull(submitConfiguration.type === 'button', () => this.doSubmit),
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
    return !R.isNil(selectError<boolean | string>(this.form));
  }

  /**
   * @stable [03.02.2020]
   * @returns {IEditableEntity<IEntity>}
   */
  private get form(): IEditableEntity<IEntity> {
    return selectEditableEntity(this.props);
  }
}
