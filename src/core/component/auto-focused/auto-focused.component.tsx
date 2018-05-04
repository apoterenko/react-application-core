import * as React from 'react';

import { DI_TYPES, lazyInject } from '../../di';
import { IEventManager } from '../../event';
import { IKeyboardEvent } from '../../definitions.interface';
import { DelayedTask, orNull } from '../../util';
import { IField } from '../field';
import { BaseComponent } from '../base';
import { IAutoFocusedState } from './auto-focused.interface';
import { Field } from '../field';
import { IAutoFocusedProps } from './auto-focused.interface';

export class AutoFocused extends BaseComponent<AutoFocused, IAutoFocusedProps, IAutoFocusedState> {

  public static defaultProps: IAutoFocusedProps = {
    delayTimeout: 100,
  };

  private static ROBOT_DETECTION_MIN_SYMBOLS_COUNT = 2;

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

    if (this.props.useRobotMode) {
      this.eventManager.remove(document, 'keypress', this.onKeyPress);
    } else {
      this.delayedTask.stop();
    }
  }

  /**
   * @stable [04.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const Component = this.props.component;
    return (
      orNull<JSX.Element>(
        !this.props.useRobotMode,
        () => (
          <div className='rac-invisible'>
            <Component ref='autoFocusedField'
                       value={this.state.focusedFieldValue}
                       onChange={(value) => this.setState({focusedFieldValue: value})}
                       {...this.props.componentProps}
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
    if (this.alreadyFocused) {
      // Don't interfere with normal input mode
      return;
    }
    let char = e.key;
    const charCode = e.keyCode;

    if (charCode === 13) {  // Enter
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
      if (document.activeElement === this.autoFocusedField.input ||  this.alreadyFocused) {
        return;
      }
      this.autoFocusedField.setFocus();
    }
  }

  /**
   * @stable [04.05.2018]
   */
  private onDelay(): void {
    const componentProps = this.props.componentProps;
    if (componentProps.onDelay) {
      componentProps.onDelay(this.state.focusedFieldValue);
    }
    this.clearField();
  }

  /**
   * @stable [05.05.2018]
   */
  private clearField(): void {
    this.setState({focusedFieldValue: Field.EMPTY_VALUE});
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
  private get alreadyFocused(): boolean {
    const activeElement = document.activeElement;
    return activeElement instanceof HTMLInputElement
      || activeElement instanceof HTMLTextAreaElement;
  }
}
