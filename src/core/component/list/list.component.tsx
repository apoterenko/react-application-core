import * as React from 'react';

import { toClassName, orNull } from '../../util';
import { IEntity } from '../../definitions.interface';
import { ListItem } from './item';
import { ProgressLabel } from '../progress';
import { IListInternalProps } from './list.interface';
import { SimpleList } from '../list/simple';
import { CenterLayout } from '../layout';
import { BaseList } from './base-list.component';

export class List extends BaseList<List, IListInternalProps> {

  public render(): JSX.Element {
    const props = this.props;
    const originalDataSource = this.getOriginalDataSource();
    const originalDataSourceEmpty = this.isOriginalDataSourceEmpty();
    const emptyMessage = this.emptyMessage;
    const progress = props.progress;

    let canShowAddAction = false;

    // If some transport error does cause a redirect to the login page,
    // we have the state when error property does set at once after destroy
    // of a list state. This is the best covert workaround to optimize
    // unnecessary business logic code of app effects
    const error = orNull(props.touched, props.error);

    if (!originalDataSource
        || progress
        || error
        || originalDataSourceEmpty) {
      return (
          <CenterLayout className='rac-list-empty'>
            {
              progress
                  ? <ProgressLabel/>
                  : (
                      error
                          ? this.errorMessage
                          : ((canShowAddAction = true) && (
                                originalDataSourceEmpty
                                  ? this.emptyDataMessage
                                  : emptyMessage
                          ))
                  )
            }
            {orNull(canShowAddAction, () => this.getAddAction())}
          </CenterLayout>
      );
    }

    return (
        <SimpleList ref='container'
                    nonInteractive={false}
                    useAvatar={true}
                    simple={false}
                    {...props}
                    className={toClassName('rac-list', props.className)}>
          {this.getDataSource().map((item) => this.getItem(item))}
          {this.getAddAction()}
        </SimpleList>
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
