import * as React from 'react';

import { BaseComponent } from '../../base';
import { Button } from '../../button';
import { IKeyboardKey, KeyboardKeyEnum } from '../../../configurations-definitions.interface';
import { IKeyboardKeyProps } from './keyboard-key.interface';
import { joinClassName, isString, isFn, calc } from '../../../util';
import { KEYBOARD_SPECIAL_KEYS } from '../keyboard.interface';

export class KeyboardKey extends BaseComponent<IKeyboardKeyProps> {
  private buttonRef = React.createRef<Button>();

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
        ref={this.buttonRef}
        disabled={props.disabled}
        rippled={props.rippled}
        className={joinClassName(
          'rac-keyboard-key',
          `rac-keyboard-key-${value}`,
          keyAsObject && calc(keyAsObject.className),
          calc(props.className, value)
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
   */
  private onClick(): void {
    this.buttonRef.current.blur();
    this.props.onSelect(this.props.value);
  }
}
