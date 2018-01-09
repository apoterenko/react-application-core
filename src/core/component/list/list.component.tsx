import * as React from 'react';
import * as R from 'ramda';

import { uuid, scrollIntoView, toClassName, orNull } from '../../util';
import { IEntity } from '../../definition.interface';
import { BaseComponent } from '../../component/base';
import { ListItem } from './item';
import { ProgressLabel } from '../progress';
import { IListInternalProps } from './list.interface';
import { SimpleList } from '../list/simple';

export class List extends BaseComponent<List, IListInternalProps, {}> {

  constructor(props: IListInternalProps) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onSearchAction = this.onSearchAction.bind(this);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const selected = this.props.selected;
    if (selected) {
      const listItem = this.refs[this.toItemId(selected)] as ListItem;
      if (listItem) {
        scrollIntoView(listItem.self, (this.refs.container as SimpleList).self as HTMLElement);
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
    const noDataFound = Array.isArray(props.data) && !props.data.length;
    const emptyMessage = this.emptyMessage;
    const progress = props.progress;

    let canShowAddAction = false;

    // If some transport error does cause a redirect to the login page,
    // we have the state when error property does set at once after destroy
    // of a list state. This is the best covert workaround to optimize
    // unnecessary business logic code of app effects
    const error = orNull(props.touched, props.error);

    if (!props.data
        || progress
        || error
        || noDataFound) {
      return (
          <div className='rac-list-empty rac-flex rac-flex-center'>
            {
              progress
                  ? <ProgressLabel/>
                  : (
                      error
                          ? this.errorMessage
                          : ((canShowAddAction = true) && (
                              noDataFound
                                  ? this.emptyDataMessage
                                  : emptyMessage
                          ))
                  )
            }
            {orNull(canShowAddAction, this.addActionTpl)}
          </div>
      );
    }

    return (
        <SimpleList ref='container'
                    nonInteractive={false}
                    avatar={true}
                    className={toClassName('rac-list', props.className)}>
          {this.listData}
          {this.addActionTpl}
        </SimpleList>
    );
  }

  protected itemTpl(entity: IEntity): JSX.Element {
    return (
        <ListItem ref={this.toItemId(entity)}
                  key={uuid()}
                  rawData={entity}
                  active={this.isSelected(entity)}
                  onClick={this.onSelect}
                  {...this.props.itemOptions}/>
    );
  }

  protected get addActionTpl(): JSX.Element {
    return orNull(
        this.props.addAction,
        this.uiFactory.makeIcon({
          type: 'add',
          className: toClassName('rac-list-add-button', 'mdc-fab'),
          onClick: this.onCreate,
        })
    );
  }

  private onSearchAction(): void {
    if (this.props.onSearch) {
      this.props.onSearch();
    }
  }

  private isSelected(item: IEntity): boolean {
    return this.props.selected && this.props.selected.id === item.id;
  }

  private onCreate(): void {
    if (this.props.onCreate) {
      this.props.onCreate();
    }
  }

  private onSelect(entity: IEntity): void {
    if (this.props.onSelect) {
      this.props.onSelect(entity);
    }
  }

  private toItemId(entity: IEntity): string {
    return `$item-${entity.id}`;
  }

  private get listData(): IEntity[] {
    const props = this.props;
    return (
        props.sorter
            ? R.sort<IEntity>(props.sorter, props.data)
            : props.data
    ).map((item) => this.itemTpl(item));
  }

  private get errorMessage(): string {
    return this.t(
        this.props.errorMessage || 'Something went wrong. There was a problem loading your data'
    );
  }

  private get emptyDataMessage(): string {
    return this.t(this.props.emptyDataMessage || 'No data found');
  }

  private get emptyMessage(): string {
    return this.t(this.props.emptyMessage || 'No data');
  }
}
