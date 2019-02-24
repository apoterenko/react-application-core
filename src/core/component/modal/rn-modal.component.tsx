import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Content } from 'native-base';

import { UniversalComponent } from '../base/universal.component';
import { IRnModalProps } from './rn-modal.interface';

export class RnModal extends UniversalComponent<IRnModalProps> {

  public static defaultProps: IRnModalProps = {
    shadowStyle: {
      backgroundColor: '#808080',
      opacity: .5,
    },
    hasContentWrapper: true,
    centerAlignment: true,
  };

  /**
   * @stable - 20.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <View style={[styles.container, {height, width}]}>
        <View style={[styles.container, {...props.shadowStyle, height, width}]}/>
        <View style={{
                flex: 1,
                ...props.centerAlignment ? {flexDirection: 'row', alignItems: 'center'} : {},
              }}>
          {
            props.hasContentWrapper
              ? <Content>{props.children}</Content>
              : props.children
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const { height, width } = Dimensions.get('window');
