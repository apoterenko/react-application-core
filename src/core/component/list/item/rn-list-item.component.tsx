import * as React from 'react';
import {
  Icon,
  ListItem,
  Left,
  Body,
  Right,
  Text,
} from 'native-base';

import { orNull, isString, nvl, uuid, ifNotNilThanValue } from '../../../util';
import { UniversalComponent } from '../../base/universal.component';
import { IRnListItemProps } from './rn-list-item.interface';

export class RnListItem extends UniversalComponent<IRnListItemProps> {

  public render(): JSX.Element {
    const props = this.props;
    const rawData = props.rawData;

    return (
      <ListItem key={nvl(rawData.id, uuid())}
                icon={!!props.avatar}
                onPress={props.onClick}>
        {
          orNull<JSX.Element>(
            props.avatar,
            () => (
              <Left>
                <Icon name={
                  isString(props.avatar)
                    ? props.avatar
                    : (props.avatar as ((data) => string)).call(null, rawData)
                }/>
              </Left>
            )
          )
        }
        <Body>
          {
            ifNotNilThanValue(
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
}
