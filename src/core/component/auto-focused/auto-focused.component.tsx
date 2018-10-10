import * as React from 'react';
import { LoggerFactory } from 'ts-smart-logger';

import { IKeyboardEvent } from '../../definitions.interface';
import { DelayedTask, orNull } from '../../util';
import { IField, TextField, DelayedChangesFieldPlugin, FIELD_EMPTY_VALUE } from '../field';
import { BaseComponent } from '../base';
import { IAutoFocusedState } from './auto-focused.interface';
import { IAutoFocusedProps } from './auto-focused.interface';
import { DI_TYPES, lazyInject } from '../../di';
import { IEventManager } from '../../event';

export class AutoFocused extends BaseComponent<AutoFocused, IAutoFocusedProps, IAutoFocusedState> {

  public static defaultProps: IAutoFocusedProps = {
    delayTimeout: 300,
  };
  private static logger = LoggerFactory.makeLogger('AutoFocused');

  private static ROBOT_DETECTION_MIN_SYMBOLS_COUNT = 3;
  private static ENTER_KEY_CODES = [10, 13];

  @lazyInject(DI_TYPES.EventManager) private eventManager: IEventManager;

  private delayedTask: DelayedTask;

  /**
   * @stable [05.05.2018]
   * @param props
   */
  constructor(props) {
    super(props);
    this.onDelay = this.onDelay.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {focusedFieldValue: ''};
    this.delayedTask = new DelayedTask(this.onDelayedTask.bind(this), props.delayTimeout, !props.useRobotMode);
  }

  /**
   * @stable [05.05.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (this.props.useRobotMode) {
      this.eventManager.add(document, 'keypress', this.onKeyPress);
    } else {
      this.delayedTask.start();
    }
  }

  /**
   * @stable [05.05.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.delayedTask.stop();
    if (this.props.useRobotMode) {
      this.eventManager.remove(document, 'keypress', this.onKeyPress);
    }
  }

  /**
   * @stable [04.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      orNull<JSX.Element>(
        !props.useRobotMode,
        () => (
          <div className='rac-invisible'>
            <TextField ref='autoFocusedField'
                       value={this.state.focusedFieldValue}
                       onChange={(value) => this.setState({focusedFieldValue: value})}
                       plugins={[DelayedChangesFieldPlugin]}
                       delayTimeout={props.delayTimeout}
                       onDelay={this.onDelay}/>
          </div>
        )
      )
    );
  }

  /**
   * @stable [05.05.2018]
   * @param {IKeyboardEvent} e
   */
  private onKeyPress(e: IKeyboardEvent): void {
    if (AutoFocused.alreadyFocused) {
      // Don't interfere with normal input mode
      return;
    }
    const props = this.props;
    let char = e.key;
    const charCode = e.keyCode;

    if (AutoFocused.ENTER_KEY_CODES.includes(charCode)) {
      if (props.ignoreEnterKeyCodeWrapper) {
        AutoFocused.logger.debug('[$AutoFocused][onKeyPress] Ignore enter key code and exit.');
        return;
      }
      char = '\n';
    }
    this.delayedTask.start();
    this.setState({focusedFieldValue: this.state.focusedFieldValue + char});
  }

  /**
   * @stable [04.05.2018]
   */
  private onDelayedTask(): void {
    if (this.props.useRobotMode) {
      const focusedFieldValue = this.state.focusedFieldValue;
      if (focusedFieldValue.length >= AutoFocused.ROBOT_DETECTION_MIN_SYMBOLS_COUNT) {
        this.onDelay();
      } else {
        this.clearField();
      }
    } else {
      if (AutoFocused.alreadyFocused) {
        return;
      }
      this.autoFocusedField.setFocus();
    }
  }

  /**
   * @stable [04.05.2018]
   */
  private onDelay(): void {
    const onSelect = this.props.onSelect;
    if (onSelect) {
      onSelect(this.state.focusedFieldValue);
    }
    this.clearField();
  }

  /**
   * @stable [05.05.2018]
   */
  private clearField(): void {
    this.setState({focusedFieldValue: FIELD_EMPTY_VALUE});
  }

  /**
   * @stable [04.05.2018]
   * @returns {IField}
   */
  private get autoFocusedField(): IField {
    return this.refs.autoFocusedField as IField;
  }

  /**
   * @stable [05.05.2018]
   * @returns {boolean}
   */
  private static get alreadyFocused(): boolean {
    const activeElement = document.activeElement;
    return activeElement instanceof HTMLInputElement
      || activeElement instanceof HTMLTextAreaElement;
  }
}
