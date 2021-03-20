import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as R from 'ramda';

import {
  calc,
  joinClassName,
  nvl,
  orNull,
  TypeUtils,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
import {
  KEYBOARD_QWERTY_LAYOUT,
  KEYBOARD_QWERTY_DIGITAL_LAYOUT,
  IKeyboardState,
} from './keyboard.interface';
import { KeyboardKey } from './key';
import { FlexLayout } from '../layout/flex';
import {
  IconsEnum,
  IKeyboardKeyValueEntity,
  IKeyboardProps,
  KeyboardClassNamesEnum,
  KeyboardKeysEnum,
  KeyboardKeyValueT,
} from '../../definition';

export class Keyboard extends GenericComponent<IKeyboardProps, IKeyboardState> {

  public static defaultProps: IKeyboardProps = {
    inline: false,
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
        ref={this.actualRef}
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
              type: IconsEnum.TIMES,
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

    return this.isInline ? el : ReactDOM.createPortal(el, this.domAccessor.documentBodyElement);  // TODO Dialog
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

    if (TypeUtils.isString(keyAsString) || keyAsObject.type === KeyboardKeysEnum.SPACE) {
      const keyValue = TypeUtils.isString(keyAsString) ? keyAsString : keyAsObject.value;
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
   * @stable [21.08.2020]
   */
  private get isInline(): boolean {
    return this.originalProps.inline;
  }

  /**
   * @stable [27.09.2019]
   * @returns {string}
   */
  private get fieldValue(): string {
    return String(nvl(this.props.field.value, ''));
  }
}
