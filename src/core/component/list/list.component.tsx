import * as React from 'react';
import * as R from 'ramda';

import { toClassName, orDefault } from '../../util';
import { IEntity } from '../../definitions.interface';
import { ListItem } from './item';
import { IListInternalProps } from './list.interface';
import { SimpleList } from '../list/simple';
import { BaseList } from './base-list.component';

export class List extends BaseList<List, IListInternalProps> {

  /**
   * @stable - 08.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const renderEl = super.render();

    return orDefault<JSX.Element, JSX.Element>(
      !R.isNil(renderEl),
      () => renderEl,
      () => (
        <SimpleList ref='container'
                    nonInteractive={false}
                    useAvatar={true}
                    simple={false}
                    {...props}
                    className={toClassName('rac-list', props.className)}>
          {this.getDataSource().map((item) => this.getItem(item))}
          {this.getAddAction()}
        </SimpleList>
      )
    );
  }

  /**
   * @stable - 08.04.2018
   * @param {IEntity} entity
   * @returns {JSX.Element}
   */
  protected getItem(entity: IEntity): JSX.Element {
    const props = this.props;
    const rowKey = this.toRowKey(entity);
    return (
      <ListItem ref={rowKey}
                key={rowKey}
                rawData={entity}
                active={this.isEntitySelected(entity)}
                onClick={this.onSelect}
                {...props.itemConfiguration}/>
    );
  }
}
