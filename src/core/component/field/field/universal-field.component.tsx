import * as React from 'react';
import * as Printf from 'sprintf-js';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import {
  isFn,
  PropsUtils,
} from '../../../util';
import { IGenericField2 } from '../../../entities-definitions.interface';
import { IUniversalFieldProps } from '../../../configurations-definitions.interface';
import {
  AnyT,
} from '../../../definitions.interface';
import {
  FieldConstants,
  IBaseEvent,
  IFieldState,
  IFocusEvent,
  IKeyboardEvent,
} from '../../../definition';
import { Field } from './field.component';

export class UniversalField<TProps extends IUniversalFieldProps,
  TState extends IFieldState>
  extends Field<TProps, TState>
  implements IGenericField2<TProps, TState> {

  protected static logger = LoggerFactory.makeLogger('UniversalField');

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IUniversalFieldProps>({}, Field);

  /**
   * @stable [17.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyBackspace(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyBackspace)) {
      props.onKeyBackspace(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyUp(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyUp)) {
      props.onKeyUp(event);
    }
  }

  /**
   * @stable [03.09.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyDown(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyDown)) {
      props.onKeyDown(event);
    }
  }

  /**
   * @stable [04.09.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyTab(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyTab)) {
      props.onKeyTab(event);
    }
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  public onKeyEscape(event: IBaseEvent): void {
    const props = this.props;
    if (isFn(props.onKeyEscape)) {
      props.onKeyEscape(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyArrowDown(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyArrowDown)) {
      props.onKeyArrowDown(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyArrowUp(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyArrowUp)) {
      props.onKeyArrowUp(event);
    }
  }

  /**
   * @stable [29.10.2019]
   * @param {boolean} usePrintf
   * @param {AnyT} args
   * @returns {string}
   */
  protected buildDisplayMessage(usePrintf: boolean, ...args: AnyT[]): string {
    return usePrintf
      ? Printf.sprintf(this.t(this.props.displayMessage), ...args)
      : FieldConstants.DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [17.06.2018]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return this.props.pattern;
  }

  /**
   * @stable [30.10.2019]
   * @param {IFocusEvent} event
   */
  protected onBlur(event: IFocusEvent): void {
    this.setState({focused: false});

    const props = this.props;
    if (isFn(props.onBlur)) {
      props.onBlur(event);
    }
  }
}
