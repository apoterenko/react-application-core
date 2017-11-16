import * as React from 'react';
import * as R from 'ramda';

import { uuid, scrollIntoView, toClassName, orNull } from '../../util';
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
    const addActionTpl = (
        orNull(
            props.addAction,
            <button className='mdc-fab material-icons app-list-add-action'
                    onClick={this.onAddItem}>
              <span className='mdc-fab__icon'>add</span>
            </button>
        )
    );
    let canShowAddAction = false;

    // If some transport error does cause a redirect to the login page,
    // we have the state when error property does set at once after destroy
    // of a list state. This is the best covert workaround to optimize
    // unnecessary business logic code of app effects
    const error = props.touched ? props.error : null;

    if (props.progress
        || error
        || isEmptyData) {
      return (
          <div className='app-empty-list app-center-layout app-full-layout'>
            {
              this.t(
                  props.progress
                      ? props.progressMessage || 'Loading...'
                      : (
                          error
                              ? props.errorMessage || 'Something went wrong. There was a problem loading your data'
                              : ((canShowAddAction = true) && (props.emptyMessage || 'No data'))
                      )
              )
            }
            {canShowAddAction ? addActionTpl : null}
          </div>
      );
    }

    return (
        <ul ref='container'
            className={toClassName(
                'mdc-list mdc-list--two-line mdc-list--avatar-list app-list app-full-flex',
                props.className
            )}>
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
          {addActionTpl}
        </ul>
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
