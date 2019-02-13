import * as React from 'react';
import { Text } from 'native-base';
import { Button, Icon } from 'native-base';

import { orNull } from '../../util';
import { UniversalComponent } from '../base/universal.component';
import { isButtonDisabled, getButtonText, getButtonIcon } from './button.support';
import { IRnButtonProps } from '../../definition';

export class RnButton extends UniversalComponent<RnButton, IRnButtonProps> {

  public static defaultProps: IRnButtonProps = {
    iconLeft: true,
  };

  /**
   * @stable - 19.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const buttonText = getButtonText(props, this.settings.messages);
    const icon = getButtonIcon(props, 'time', 'information-circle');

    return (
      <Button rounded={props.rounded}
              disabled={isButtonDisabled(props)}
              bordered={props.bordered}
              style={props.style}
              block={props.block}
              small={props.small}
              success={props.success}
              large={props.large}
              iconLeft={props.iconLeft}
              transparent={props.transparent}
              onPress={props.onPress}>
        {
          orNull(
            icon,
            () => <Icon name={icon} style={props.iconStyle}/>
          )
        }
        {
          orNull(
            buttonText,
            () => (
              <Text style={props.textStyle}>
                {this.t(buttonText)}
              </Text>
            )
          )
        }
        {props.children}
      </Button>
    );
  }
}
