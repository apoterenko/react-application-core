import * as React from 'react';

import { BaseComponent } from '../../base';
import { Button } from '../../button';
import {
  IKeyboardKeyProps,
  IKeyboardKeyValueEntity,
  KeyboardKeyDescriptorsEnum,
  KeyboardKeysEnum,
} from '../../../definition';
import {
  calc,
  TypeUtils,
  joinClassName,
} from '../../../util';

export class KeyboardKey extends BaseComponent<IKeyboardKeyProps> {

  private readonly buttonRef = React.createRef<Button>();

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
    const keyAsObject = this.keyAsObject;
    const value = this.value;

    return (
      <Button
        ref={this.buttonRef}
        disabled={props.disabled}
        touched={this.isKeyTouched}
        className={joinClassName(
          'rac-keyboard-key',
          `rac-keyboard-key-${value}`,
          keyAsObject && calc(keyAsObject.className),
          calc(props.className, value)
        )}
        style={keyAsObject && keyAsObject.width ? {width: keyAsObject.width} : {}}
        onClick={this.onClick}
      >
        {TypeUtils.isFn(props.renderer) ? props.renderer(value) : value}
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

  /**
   * @stable [02.02.2020]
   * @returns {string}
   */
  private get value(): string {
    const props = this.props;
    const keyAsString = this.keyAsString;
    const keyAsObject = this.keyAsObject;

    return TypeUtils.isString(keyAsString)
      ? (
        props.useUppercase
          ? keyAsString.toUpperCase()
          : keyAsString
      )
      : (
        keyAsObject.type === KeyboardKeysEnum.UPPERCASE
          ? (props.useUppercase ? KeyboardKeyDescriptorsEnum.LOWERCASE : keyAsObject.value)
          : keyAsObject.value
      );
  }

  /**
   * @stable [02.02.2020]
   * @returns {boolean}
   */
  private get isKeyTouched(): boolean {
    return TypeUtils.isString(this.keyAsString)
      || KeyboardKeyDescriptorsEnum.CLOSE !== this.keyAsObject.value; // Touch issues fixes
  }

  /**
   * @stable [02.02.2020]
   * @returns {IKeyboardKeyValueEntity}
   */
  private get keyAsObject(): IKeyboardKeyValueEntity {
    return this.props.value as IKeyboardKeyValueEntity;
  }

  /**
   * @stable [02.02.2020]
   * @returns {string}
   */
  private get keyAsString(): string {
    return this.props.value as string;
  }
}
