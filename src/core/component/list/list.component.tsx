import * as React from 'react';
import * as ramda from 'ramda';

import { uuid } from '../../util';
import { IEntity } from '../../definition.interface';
import { BaseComponent } from '../../component/base';

import { ListItem } from './item';
import { IListInternalProps } from './list.interface';

export class List extends BaseComponent<List, IListInternalProps, {}> {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  public shouldComponentUpdate(nextProps: IListInternalProps, nextState: {}): boolean {
    const previousProps = this.props;
    return !ramda.equals(nextProps.data, previousProps.data)
        || !ramda.equals(nextProps.selected, previousProps.selected)
        || !ramda.equals(nextProps.progress, previousProps.progress);
  }

  public render(): JSX.Element {
    const props = this.props;
    const className = ['mdc-list', props.className];
    const listItems = (props.data || []).map(
        (item) => (
            <ListItem key={uuid()}
                      rawData={item}
                      renderer={props.renderer}
                      active={this.isSelected(item)}
                      onClick={this.onSelect}>
            </ListItem>
        ),
    );

    if (props.progress || (
            // If some transport error does cause a redirect to the login page,
            // we have the state when error property does set at once after destroy
            // of a list state. This is the best covert workaround to optimize
            // unnecessary business logic code of app effects
            props.dirty
            && props.error
        )) {
      return (
          <div className='mdc-list-wrapper'>
            {
              props.progress
                  ? this.t(props.progressMessage || 'Loading...')
                  : this.t(props.errorMessage || 'Something went wrong. There was a problem loading your data')
            }
          </div>
      );
    }
    return (
        <div className='mdc-list-wrapper'>
          <ul className={className.filter((cls) => !!cls).join(' ')}>
            {listItems.length ? listItems : this.t(props.emptyMessage || 'No data')}
          </ul>
          {
            props.addAction
                ? (<button className='mdc-fab material-icons app-add-item-action'
                           onClick={this.onAddItem}>
                      <span className='mdc-fab__icon'>
                        add
                      </span>
                    </button>)
                : null
          }
        </div>
    );
  }

  private isSelected(item: IEntity): boolean {
    return this.props.selected && this.props.selected.id === item.id;
  }

  private onAddItem(): void {
    if (this.props.onAddItem) {
      this.props.onAddItem();
    }
  }

  private onSelect(entity: IEntity): void {
    if (this.props.onSelect) {
      this.props.onSelect(entity);
    }
  }
}
