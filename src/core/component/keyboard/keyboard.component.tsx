import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as R from 'ramda';

import { ENV } from '../../env';
import {
  calc,
  isInline,
  isString,
  joinClassName,
  nvl,
  orNull,
} from '../../util';
import { BaseComponent } from '../base';
import {
  KEYBOARD_QWERTY_LAYOUT,
  KEYBOARD_QWERTY_DIGITAL_LAYOUT,
  IKeyboardState,
} from './keyboard.interface';
import { KeyboardKey } from './key';
import { FlexLayout } from '../layout/flex';
import {
  IKeyboardProps,
  KeyboardClassNamesEnum,
  KeyboardKeyValueT,
  KeyboardKeysEnum,
  IKeyboardKeyValueEntity,
} from '../../definition';

export class Keyboard extends BaseComponent<IKeyboardProps, IKeyboardState> {

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

    this.state = {position: this.fieldValue.length, mode: 0, useUppercase: false};
  }

  /**
   * @stable [08.05.2018]
   * @returns {React.ReactNode}
   */
  public render(): React.ReactNode {
    const props = this.props;
    const state = this.state;
    const keys = props.layout[state.mode];

    const el = (
      <div
        ref={this.selfRef}
        className={joinClassName(
          KeyboardClassNamesEnum.KEYBOARD,
          'rac-no-user-select',
          !this.isInline && 'rac-keyboard-portal',
          calc(props.className)
        )}
      >
        {
          orNull<JSX.Element>(
            !this.isInline,
            () => this.uiFactory.makeIcon({
              key: 'keyboard-close-action-key',
              type: 'close',
              className: 'rac-keyboard-close',
              onClick: props.onClose,
            })
          )
        }
        {
          keys.map((row, index) => (
            <FlexLayout
              key={`keyboard-row-${index}`}
              full={false}
              row={true}
              justifyContentCenter={true}
              alignItemsCenter={true}
            >
              {
                row.map((key, index2) => (
                  <KeyboardKey
                    {...props.keyboardKeyConfiguration}
                    key={`keyboard-row-column-${index}-${index2}`}
                    value={key}
                    useUppercase={state.useUppercase}
                    onSelect={this.onSelect}/>
                ))
              }
            </FlexLayout>
          ))
        }
      </div>
    );

    return this.isInline ? el : ReactDOM.createPortal(el, ENV.documentBody);
  }

  /**
   * @stable [08.05.2018]
   * @param {KeyboardKeyValueT} key
   */
  private onSelect(key: KeyboardKeyValueT): void {
    let nextValue;
    const props = this.props;
    const state = this.state;
    const fieldValue = this.fieldValue;
    const position = fieldValue.length;
    const chars = fieldValue.split('');
    const keyAsString = key as string;
    const keyAsObject = key as IKeyboardKeyValueEntity;

    if (isString(keyAsString) || keyAsObject.type === KeyboardKeysEnum.SPACE) {
      const keyValue = isString(keyAsString) ? keyAsString : keyAsObject.value;
      nextValue = R.insert<string>(position, state.useUppercase ? keyValue.toUpperCase() : keyValue, chars);
      props.onChange(nextValue.join(''));
      this.setState({position: position + 1});
    } else {
      switch (keyAsObject.type) {
        case KeyboardKeysEnum.UPPERCASE:
          this.setState({useUppercase: !state.useUppercase});
          break;
        case KeyboardKeysEnum.CHANGE_LAYOUT:
          this.setState({mode: this.state.mode === props.layout.length - 1 ? 0 : this.state.mode + 1});
          break;
        case KeyboardKeysEnum.BACKSPACE:
          if (position > 0) {
            nextValue = R.remove<string>(position - 1, 1, chars).join('');
            props.onChange(nextValue);
            this.setState({position: position - 1});
          }
          break;
        case KeyboardKeysEnum.CLOSE:
          props.onClose();
          break;
      }
    }
  }

  /**
   * @stable [02.02.2020]
   * @returns {boolean}
   */
  private get isInline(): boolean {
    return isInline(this.props);
  }

  /**
   * @stable [27.09.2019]
   * @returns {string}
   */
  private get fieldValue(): string {
    return String(nvl(this.props.field.value, ''));
  }
}
