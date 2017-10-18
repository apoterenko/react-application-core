import * as React from 'react';
import * as R from 'ramda';

import { uuid, scrollIntoView, toClassName } from '../../util';
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

  public componentDidMount(): void {
    super.componentDidMount();

    const selected = this.props.selected;
    if (selected) {
      const listItem = this.refs[this.toItemId(selected)] as ListItem;
      if (listItem) {
        scrollIntoView(listItem.self, this.refs.container as HTMLElement);
      }
    }
  }

  public shouldComponentUpdate(nextProps: IListInternalProps, nextState: {}): boolean {
    const previousProps = this.props;
    return !R.equals(nextProps.data, previousProps.data)
        || !R.equals(nextProps.selected, previousProps.selected)
        || !R.equals(nextProps.progress, previousProps.progress);
  }

  public render(): JSX.Element {
    const props = this.props;

    const isEmptyData = !props.data || (Array.isArray(props.data) && !props.data.length);

    // If some transport error does cause a redirect to the login page,
    // we have the state when error property does set at once after destroy
    // of a list state. This is the best covert workaround to optimize
    // unnecessary business logic code of app effects
    const error = props.dirty ? props.error : null;

    if (props.progress
        || error
        || isEmptyData) {
      return (
          <div className='app-list-wrapper app-center-layout app-full-layout'>
            {
              this.t(
                  props.progress
                      ? props.progressMessage || 'Loading...'
                      : (
                          error
                              ? props.errorMessage || 'Something went wrong. There was a problem loading your data'
                              : props.emptyMessage || 'No data'
                      )
              )
            }
          </div>
      );
    }

    return (
        <div ref='container'
             className='app-list-wrapper'>
          <ul className={toClassName('mdc-list', props.className)}>
            {props.data.map(
                (item) => (
                    <ListItem key={uuid()}
                              rawData={item}
                              active={this.isSelected(item)}
                              onClick={this.onSelect}
                              ref={this.toItemId(item)}
                              {...props.itemOptions}/>
                ),
            )}
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

  private toItemId(entity: IEntity): string {
    return 'item-' + entity.id;
  }
}
