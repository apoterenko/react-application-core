import * as React from 'react';

import { DelayedTask } from '../../util';
import { IField } from '../field';
import { BaseComponent } from '../base';
import { IAutoFocusedProps, IAutoFocusedState } from './auto-focused.interface';
import { Field } from '../field';

export class AutoFocused extends BaseComponent<AutoFocused, IAutoFocusedProps, IAutoFocusedState> {

  public static defaultProps: IAutoFocusedProps = {
    delayTimeout: 300,
  };

  private delayedTask: DelayedTask;

  /**
   * @stable [04.05.2018]
   * @param props
   */
  constructor(props) {
    super(props);
    this.onDelay = this.onDelay.bind(this);

    this.state = {};
    this.delayedTask = new DelayedTask(this.onDelayedTask.bind(this), props.delayTimeout, true);
  }

  /**
   * @stable [04.05.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();
    this.delayedTask.start();
  }

  /**
   * @stable [04.05.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.delayedTask.stop();
  }

  /**
   * @stable [04.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const Component = this.props.component;
    return (
      <div className='rac-invisible'>
        <Component ref='autoFocusedField'
                   value={this.state.focusedFieldValue}
                   onChange={(value) => this.setState({focusedFieldValue: value})}
                   {...this.props.componentProps}
                   onDelay={this.onDelay}/>
      </div>
    );
  }

  /**
   * @stable [04.05.2018]
   */
  private onDelayedTask(): void {
    const activeElement = document.activeElement;
    if (activeElement === this.autoFocusedField.input
      || activeElement instanceof HTMLInputElement
      || activeElement instanceof HTMLTextAreaElement) {
      return;
    }
    this.autoFocusedField.setFocus();
  }

  /**
   * @stable [04.05.2018]
   */
  private onDelay(): void {
    const componentProps = this.props.componentProps;
    if (componentProps.onDelay) {

      componentProps.onDelay(this.state.focusedFieldValue);
      this.setState({focusedFieldValue: Field.EMPTY_VALUE});
    }
  }

  /**
   * @stable [04.05.2018]
   * @returns {IField}
   */
  private get autoFocusedField(): IField {
    return this.refs.autoFocusedField as IField;
  }
}
