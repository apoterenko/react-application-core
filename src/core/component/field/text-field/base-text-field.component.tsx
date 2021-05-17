import * as React from 'react';
import * as R from 'ramda';
import MaskedTextInput from 'react-text-mask';

import {
  ClsUtils,
  FilterUtils,
  NvlUtils,
  ObjectUtils,
  PropsUtils,
} from '../../../util';
import {
  IVisibleWrapper,
  StringNumberT,
  UniCodesEnum,
} from '../../../definitions.interface';
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

    if (this.isClearActionRendered()) {
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
   * @stable [22.12.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), this.baseTextFieldClassName);
  }

  /**
   * @stable [21.03.2021]
   */
  protected isClearActionRendered(): boolean {
    return this.originalProps.clearActionRendered;
  }

  /**
   * @stable [22.12.2020]
   * @protected
   */
  protected get baseTextFieldClassName(): string {
    const {
      prefixLabel,
    } = this.originalProps;

    return ClsUtils.joinClassName(
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
  protected get inputMirrorElement(): JSX.Element {
    if (!this.isKeyboardAndCursorUsed || this.isValueNotPresent) {
      return null;
    }

    // TODO Move to support
    const value = this.value;
    const content = String(
      this.isOriginalPasswordType
        ? this.replaceByPasswordPlaceholder(value)
        : value
    ).replace(/ /g, UniCodesEnum.NO_BREAK_SPACE);

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
   * @stable [30.04.2021]
   * @param value
   */
  private replaceByPasswordPlaceholder(value: StringNumberT): string {
    return R.isNil(value)
      ? value
      : String(value).replace(/./g, this.environment.passwordPlaceholder);
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

    const result = fieldActions
      .map(
        (action): IFieldActionEntity => {
          let isVisible = !isInactive;
          switch (action.type) {
            case FieldActionTypesEnum.CLOSE:
              isVisible = isValuePresent && !isInactive;
              break;
            case FieldActionTypesEnum.DOWNLOAD:
              isVisible = isValuePresent && !isBusy;
              break;
          }
          return FilterUtils.notNilValuesFilter<IFieldActionEntity, IFieldActionEntity>({
            ...action,
            visible: !isVisible,
            className: ClsUtils.joinClassName(
              action.className,
              !isVisible && ComponentClassesEnum.VISIBILITY_HIDDEN
            ),
          });
        }
      );

    return R.sort<IFieldActionEntity>(this.visibilitySorter, result);
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get isActioned(): boolean {
    return ObjectUtils.isObjectNotEmpty(this.fieldActions);
  }

  /**
   * @stable [21.03.2021]
   * @param a
   * @param b
   */
  private readonly visibilitySorter = (a: IVisibleWrapper, b: IVisibleWrapper) =>
    (a.visible && b.visible) || (!a.visible && !b.visible)
      ? 0
      : (!a.visible && b.visible ? 1 : -1);
}
