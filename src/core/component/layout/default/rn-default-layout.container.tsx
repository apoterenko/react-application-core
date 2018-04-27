import * as React from 'react';
import {
  Right,
  Body,
  Left,
  Container,
  Header,
  Content,
  Title,
} from 'native-base';

import { orNull } from '../../../util';
import { UniversalBaseContainer } from '../../base/universal-base.container';
import {
  IRnDefaultLayoutContainerProps,
  IRnDefaultLayoutContainer,
} from './rn-default-layout.interface';
import { RnDrawer } from '../../drawer/rn-drawer.component';
import { RnButton } from '../../button/rn-button.component';

export class RnDefaultLayoutContainer extends UniversalBaseContainer<IRnDefaultLayoutContainerProps>
  implements IRnDefaultLayoutContainer {

  public static defaultProps: IRnDefaultLayoutContainerProps = {
    useDrawer: true,
    useHeader: true,
    headerMenuActionEnabled: true,
  };

  private drawer;

  /**
   * @stable [27.04.2018]
   * @param {IRnDefaultLayoutContainerProps} props
   */
  constructor(props: IRnDefaultLayoutContainerProps) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
  }

  /**
   * @stable [27.04.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    const header = orNull<JSX.Element>(
      props.useHeader,
      () => (
        <Header style={props.headerStyle}>
          <Left>
            {
              orNull<JSX.Element>(
                props.headerBackActionEnabled,
                () => (
                  <RnButton transparent={true}
                            icon='arrow-back'
                            style={props.headerActionStyle}
                            iconStyle={props.headerActionIconStyle}
                            onPress={this.navigateToBack}/>
                )
              )
            }
            {
              orNull<JSX.Element>(
                props.headerMenuActionEnabled && !props.headerBackActionEnabled,
                () => (
                  <RnButton transparent={true}
                            icon='menu'
                            style={props.headerActionStyle}
                            iconStyle={props.headerActionIconStyle}
                            onPress={this.openDrawer}/>
                )
              )
            }
          </Left>
          <Body>
            {
              orNull<JSX.Element>(
                props.title,
                () => (
                  <Title style={props.headerTitleStyle}>
                    {this.t(props.title)}
                  </Title>
                )
              )
            }
          </Body>
          {
            orNull<JSX.Element>(
              props.headerContent,
              () => (
                <Right>
                  {props.headerContent}
                </Right>
              )
            )
          }
        </Header>
      )
    );

    const body = (
      <Container>
        {header}
        <Content style={props.contentStyle}>
          {props.children}
        </Content>
      </Container>
    );

    if (props.useDrawer) {
      return (
        <RnDrawer
          ref={(ref) => (this.drawer = ref)}
          content={
            <Content style={props.drawerContentStyle}>
              {props.drawerContent}
            </Content>
          }>
          {body}
        </RnDrawer>
      );
    }
    return body;
  }

  /**
   * @stable [27.04.2018]
   */
  public openDrawer(): void {
    this.drawer.open();
  }

  /**
   * @stable [27.04.2018]
   */
  public closeDrawer(): void {
    this.drawer.clone();
  }
}
