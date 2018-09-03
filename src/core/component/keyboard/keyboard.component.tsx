import * as React from 'react';
import * as R from 'ramda';

import { IJqField, isString, addChild, removeChild } from '../../util';
import { BaseComponent } from '../base';
import {
  IKeyboardKey,
  KeyboardKeyEnum,
  KeyboardKeyT,
  IKeyboardProps,
  KEYBOARD_QWERTY_LAYOUT,
  KEYBOARD_QWERTY_DIGITAL_LAYOUT,
  IKeyboardState,
} from './keyboard.interface';
import { KeyboardKey } from './key';

export class Keyboard extends BaseComponent<Keyboard, IKeyboardProps, IKeyboardState> {

  public static defaultProps: IKeyboardProps = {
    layout: [KEYBOARD_QWERTY_LAYOUT, KEYBOARD_QWERTY_DIGITAL_LAYOUT],
  };

  /**
   * @stable [03.09.2018]
   * @param {IKeyboardProps} props
   */
  constructor(props: IKeyboardProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);

    this.state = {position: this.currentPosition, mode: 0, useUppercase: false};
  }

  /**
   * @stable [03.09.2018]
   */
  public componentDidMount() {
    super.componentDidMount();
    addChild(this.self);
  }

  /**
   * @stable [03.09.2018]
   */
  public componentWillUnmount() {
    removeChild(this.self);
    super.componentWillUnmount();
  }

  /**
   * @stable [08.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const state = this.state;
    const keys = props.layout[state.mode];
    const keysEls = [];

    keys.forEach((row, index) => {
      keysEls.push(
        <div key={`keyboard-row-${index}`}
             className='rac-flex rac-flex-center'>
          {
            row.map((key, index2) => (
              <KeyboardKey key={`keyboard-row-column-${index}-${index2}`}
                           value={key}
                           useUppercase={state.useUppercase}
                           onSelect={this.onSelect}/>
            ))
          }
        </div>
      );
    });

    // React waiting for a wrapper at least before clearing => <div>KEYBOARD_DIV</div>
    return (
      <div>
        <div ref='self'
             className='rac-keyboard rac-absolute-bottom-position rac-no-user-select'>
          <div className='rac-flex'>
            {
              this.uiFactory.makeIcon({
                type: 'cancel',
                simple: true,
                className: 'rac-keyboard-close',
                onClick: props.onClose,
              })
            }
          </div>
          {keysEls}
        </div>
      </div>
    );
  }

  /**
   * @stable [08.05.2018]
   * @param {KeyboardKeyT} key
   */
  private onSelect(key: KeyboardKeyT): void {
    let nextValue;
    const props = this.props;
    const state = this.state;
    const jEl = this.jField;
    const position = this.currentPosition;
    const chars = (jEl.val() as string).split('');
    const keyAsString = key as string;
    const keyAsObject = key as IKeyboardKey;

    if (isString(keyAsString) || keyAsObject.type === KeyboardKeyEnum.SPACE) {
      const keyValue = isString(keyAsString) ? keyAsString : keyAsObject.value;
      nextValue = R.insert<string>(position, state.useUppercase ? keyValue.toUpperCase() : keyValue, chars);
      props.onChange(nextValue.join(''));
      this.setState({position: position + 1});
    } else {
      switch (keyAsObject.type) {
        case KeyboardKeyEnum.UPPERCASE:
          this.setState({useUppercase: !state.useUppercase});
          break;
        case KeyboardKeyEnum.CHANGE_LAYOUT:
          this.setState({mode: this.state.mode === props.layout.length - 1 ? 0 : this.state.mode + 1});
          break;
        case KeyboardKeyEnum.BACKSPACE:
          if (position > 0) {
            nextValue = R.remove<string>(position - 1, 1, chars).join('');
            props.onChange(nextValue);
            this.setState({position: position - 1});
          }
          break;
      }
    }
  }

  /**
   * @stable [08.05.2018]
   * @returns {IJqField}
   */
  private get jField(): IJqField {
    return $(this.props.field) as IJqField;
  }

  /**
   * @stable [21.08.2018]
   * @returns {number}
   */
  private get currentPosition(): number {
    return this.props.field.value.length;
  }
}
