import * as React from 'react';
import * as ramda from 'ramda';

import { uuid } from 'core/util';
import { IEntity } from 'core/definition.interface';
import { BaseComponent } from 'core/component/base';

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

    if (props.progress) {
      return (
          <div className='mdc-list-wrapper'>
            <div className='mdc-layout-grid'>
              <div className='mdc-layout-grid__inner'>
                {this.t(props.progressMessage || 'Loading...')}
              </div>
            </div>
          </div>
      );
    }
    return (
        <div className='mdc-list-wrapper'>
          <ul className={className.filter((cls) => !!cls).join(' ')}>
            {listItems}
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
