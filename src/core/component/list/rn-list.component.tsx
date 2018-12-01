import * as React from 'react';
import { FlatList } from 'react-native';

import { IRnListProps } from '../../props-definitions.interface';
import { IEntity, IKeyValue } from '../../definitions.interface';
import { UniversalList } from './universal-list.component';
import { RnListItem } from './item/rn-list-item.component';
import { RnMessage } from '../message/rn-message.component';
import { RnButton } from '../button/rn-button.component';

export class RnList extends UniversalList<RnList, IRnListProps> {

  /**
   * @stable [09.06.2018]
   * @returns {JSX.Element}
   */
  protected getEmptyMessageAction(): JSX.Element {
    return <RnButton {...this.getEmptyMessageActionComponentProps()}/>;
  }

  /**
   * @stable [09.06.2018]
   * @returns {JSX.Element}
   */
  protected getMessage(): JSX.Element {
    return (
      <RnMessage {...this.getMessageComponentProps()}>
        {this.getAddAction()}
      </RnMessage>
    );
  }

  /**
   * @stable - 24.04.2018
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    return (
      <FlatList ref='container'
                data={this.dataSource.map((item) => ({...item, key: String(item.id)}))}
                renderItem={({item, separators}) => this.getItem(item, separators)}>
        {this.getAddAction()}
      </FlatList>
    );
  }

  /**
   * @stable - 24.04.2018
   * @param {IEntity} entity
   * @param {IKeyValue} separators
   * @returns {JSX.Element}
   */
  protected getItem(entity: IEntity, separators: IKeyValue): JSX.Element {
    const props = this.props;
    const rowKey = this.toRowKey(entity);
    return (
      <RnListItem ref={rowKey}
                  key={rowKey}
                  rawData={entity}
                  separators={separators}
                  selected={this.isEntitySelected(entity)}
                  onClick={() => this.onSelect(entity)}
                  {...props.itemConfiguration}/>
    );
  }

  protected getAddAction(): JSX.Element {
    // TODO
    return null;
  }
}
