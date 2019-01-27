import * as React from 'react';

import { toClassName, isString, isFn } from '../../../util';
import { BaseComponent } from '../../base';
import { KEYBOARD_SPECIAL_KEYS } from '../keyboard.interface';
import { IKeyboardKeyProps } from './keyboard-key.interface';
import { IBasicEvent } from '../../../react-definitions.interface';
import { IKeyboardKey, KeyboardKeyEnum } from '../../../configurations-definitions.interface';
import { Button } from '../../button';

export class KeyboardKey extends BaseComponent<KeyboardKey, IKeyboardKeyProps> {

  /**
   * @stable [26.01.2019]
   * @param {IKeyboardKeyProps} props
   */
  constructor(props: IKeyboardKeyProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable [27.01.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const keyAsString = props.value as string;
    const keyAsObject = props.value as IKeyboardKey;
    const value = isString(keyAsString)
      ? (
        props.useUppercase
          ? keyAsString.toUpperCase()
          : keyAsString
      )
      : (
        keyAsObject.type === KeyboardKeyEnum.UPPERCASE
          ? (props.useUppercase ? KEYBOARD_SPECIAL_KEYS.LOWERCASE : keyAsObject.value)
          : keyAsObject.value
      );

    return (
      <Button
        className={toClassName(
          'rac-keyboard-key',
          `rac-keyboard-key-${value}`,
          keyAsObject && keyAsObject.className
        )}
        style={keyAsObject && keyAsObject.width ? {width: `${keyAsObject.width}px`} : {}}
        onClick={this.onClick}
      >
        {isFn(props.renderer) ? props.renderer(value) : value}
      </Button>
    );
  }

  /**
   * @stable [08.05.2018]
   * @param {IBasicEvent} e
   */
  private onClick(e: IBasicEvent): void {
    this.stopEvent(e);
    this.props.onSelect(this.props.value);
  }
}
