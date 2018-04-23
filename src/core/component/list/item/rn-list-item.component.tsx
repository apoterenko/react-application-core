import * as React from 'react';
import { Text} from 'react-native';
import { Icon, ListItem, Left, Body, Right } from 'native-base';

import { orDefault, orNull, isFn } from '../../../util';
import { UniversalComponent } from '../../base/universal.component';

// TODO
export class RnListItem extends UniversalComponent<RnListItem, any, any> {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const rawData = props.rawData;

    return (
      <ListItem key={rawData.id}
                icon={!!props.avatar}
                onPress={this.onClick}>
        <Left>
          {
            orNull(
              props.avatar,
              () => (
                <Icon name={
                  isFn(props.avatar) ? props.avatar(rawData) : props.avatar
                }/>
              )
            )
          }
        </Left>
        <Body>
        {
          orDefault(
            props.renderer,
            () => props.renderer(rawData),
            () => (
              <Text>
                {props.tpl(rawData)}
              </Text>
            )
          )
        }
        </Body>
        <Right/>
      </ListItem>
    );
  }

  private onClick(data): void {
    const props = this.props;
    if (props.onClick) {
      props.onClick(data);
    }
  }
}
