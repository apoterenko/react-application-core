import * as React from 'react';
import { FlatList, View, Text } from 'react-native';

import { UniversalList } from './universal-list.component';
import { RnListItem } from './item/rn-list-item.component';

// TODO
export class RnList extends UniversalList<RnList, any> {

  protected doScrollIntoView(item: Element, view: Element): void {
    // TODO
  }

  protected getMessage(): JSX.Element {
    const props = this.props;
    return (
      <View>
        <Text>
          {
            props.progress
              ? 'Please wait...'
              : (
                props.error
                  ? props.error
                  : 'No data found'
              )
          }
        </Text>
      </View>
    );
  }

  /**
   * [23.04.2018]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    return (
        <FlatList
            ref='container'
            data={this.getDataSource().map((item) => ({...item, key: String(item.id)}))}
            renderItem={({item, separators}) => (
              <RnListItem rawData={item}
                          separators={separators}
                          onClick={() => this.onSelect(item)}
                          {...props.itemConfiguration}/>
            )}
        >
          {this.getAddAction()}
        </FlatList>
    );
  }

  protected getAddAction(): JSX.Element {
    // TODO
    return null;
  }
}
