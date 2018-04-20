import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { UniversalBaseComponent } from '../base/universal-base.component';
import { IRnModalProps } from './rn-modal.interface';

const { height, width } = Dimensions.get('window');

export class RnModal extends UniversalBaseComponent<RnModal, IRnModalProps> {

  public static defaultProps: IRnModalProps = {
    shadowStyle: {
      backgroundColor: '#808080',
      opacity: .5,
    },
  };

  /**
   * @stable - 20.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <View style={[styles.container, { height, width }]}>
        <View style={[styles.container, { ...props.shadowStyle, height, width }]}/>
        {props.children}
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
