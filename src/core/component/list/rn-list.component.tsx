import * as React from 'react';
import { FlatList } from 'react-native';

import { UniversalList } from './universal-list.component';
import { RnListItem } from './item/rn-list-item.component';
import { IRnListConfiguration } from '../../configurations-definitions.interface';
import { IRnListEntity } from '../../entities-definitions.interface';
import { IEntity, IKeyValue } from '../../definitions.interface';
import { RnMessage } from '../message/rn-message.component';

export class RnList extends UniversalList<RnList, IRnListConfiguration & IRnListEntity> {

  /**
   * @stable - 24.04.2018
   * @returns {JSX.Element}
   */
  protected getMessage(): JSX.Element {
    const props = this.props;
    return (
      <RnMessage emptyData={this.isOriginalDataSourceEmpty()}
                 error={props.error}
                 progress={props.progress}>
        {this.getAddAction()}
      </RnMessage>
    );
  }

  /**
   * @stable - 24.04.2018
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    return (
      <FlatList ref='container'
                data={this.getDataSource().map((item) => ({...item, key: String(item.id)}))}
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
                  active={this.isEntitySelected(entity)}
                  onClick={() => this.onSelect(entity)}
                  {...props.itemConfiguration}/>
    );
  }

  protected doScrollIntoView(item: Element, view: Element): void {
    // TODO
  }

  protected getAddAction(): JSX.Element {
    // TODO
    return null;
  }
}
