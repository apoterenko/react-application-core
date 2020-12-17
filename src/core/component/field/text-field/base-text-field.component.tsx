import * as React from 'react';
import * as R from 'ramda';
import MaskedTextInput from 'react-text-mask';

import {
  CalcUtils,
  ClsUtils,
  NvlUtils,
  ObjectUtils,
  PropsUtils,
} from '../../../util';
import { UniCodesEnum } from '../../../definitions.interface';
import { Field } from '../field/field.component';
import {
  ComponentClassesEnum,
  FieldActionPositionsEnum,
  FieldActionTypesEnum,
  FieldClassesEnum,
  IBaseTextFieldProps,
  IBaseTextFieldState,
  IFieldActionEntity,
  TextFieldClassesEnum,
} from '../../../definition';

export class BaseTextField<TProps extends IBaseTextFieldProps = IBaseTextFieldProps,
                           TState extends IBaseTextFieldState = IBaseTextFieldState>
    extends Field<TProps, TState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IBaseTextFieldProps>({
    clearActionRendered: true,
  }, Field);

  private static readonly DEFAULT_MASK_GUIDE = false;

  protected defaultActions: IFieldActionEntity[] = [];

  /**
   * @stable [14.10.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    if (originalProps.clearActionRendered) {
      this.defaultActions.push({
        type: FieldActionTypesEnum.CLOSE,
        onClick: this.clearValue,
      });
    }
  }

  /**
   * @stable [30.11.2020]
   * @protected
   */
  protected getInputElement(): JSX.Element {
    return R.isNil(this.getFieldMask())
      ? super.getInputElement()
      : this.maskedInputElement;
  }

  /**
   * @stable [18.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    const {
      prefixLabel,
    } = this.originalProps;

    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      TextFieldClassesEnum.BASE_TEXT_FIELD,
      this.isActioned && TextFieldClassesEnum.BASE_TEXT_FIELD_ACTIONED,
      prefixLabel
        ? TextFieldClassesEnum.BASE_TEXT_FIELD_LABEL_PREFIXED
        : TextFieldClassesEnum.BASE_TEXT_FIELD_LABEL_NOT_PREFIXED
    );
  }

  /**
   * @stable [12.09.2018]
   * @returns {JSX.Element}
   */
  protected get mirrorInputElement(): JSX.Element {
    if (!this.isKeyboardAndCursorUsed || this.isValueNotPresent) {
      return null;
    }

    // TODO Move to support
    const value = this.value;
    const content = String((
      this.props.type === 'password'
        ? String(value).replace(/./g, this.environment.passwordPlaceholder)
        : value
    )).replace(/ /g, UniCodesEnum.NO_BREAK_SPACE);

    return (
      <span
        ref={this.inputMirrorRef}
        className={
          ClsUtils.joinClassName(
            this.getInputElementProps().className,
            FieldClassesEnum.INPUT_MIRROR,
            ComponentClassesEnum.INVISIBLE
          )
        }
      >
        {content}
      </span>
    );
  }

  /**
   * @stable [09.11.2020]
   * @param action
   * @protected
   */
  protected isFieldActionDisabled(action: IFieldActionEntity): boolean {
    return CalcUtils.calc(action.disabled) || this.isInactive;
  }

  /**
   * @stable [30.11.2020]
   * @private
   */
  private get maskedInputElement(): JSX.Element {
    const mask = this.getFieldMask();
    const {
      maskGuide,
    } = this.originalProps;

    return (
      <MaskedTextInput
        guide={NvlUtils.nvl(maskGuide, BaseTextField.DEFAULT_MASK_GUIDE)}
        mask={mask}
        {...this.getInputElementProps()}/>
    );
  }

  /**
   * @stable [17.12.2020]
   * @protected
   */
  protected get actionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {
          this.fieldActions.map(
            (action, index) => (
              <React.Fragment
                key={`field-action-key-${index}`}
              >
                {this.uiFactory.makeIcon(action)}
              </React.Fragment>
            )
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [17.12.2020]
   * @private
   */
  private get fieldActions(): IFieldActionEntity[] {
    const {
      actions = [],
      actionsPosition,
    } = this.originalProps;

    const defaultActions = this.defaultActions || [];
    const fieldActions = actionsPosition === FieldActionPositionsEnum.LEFT
      ? defaultActions.concat(actions)
      : actions.concat(defaultActions);

    const isBusy = this.isBusy;
    const isValuePresent = this.isValuePresent;
    const isInactive = this.isInactive;

    return fieldActions
      .filter(
        (action) => {
          switch (action.type) {
            case FieldActionTypesEnum.CLOSE:
              return isValuePresent && !isInactive;
            case FieldActionTypesEnum.DOWNLOAD:
              return isValuePresent && !isBusy;
          }
          return !isInactive;
        }
      );
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get isActioned(): boolean {
    return ObjectUtils.isObjectNotEmpty(this.fieldActions);
  }
}
