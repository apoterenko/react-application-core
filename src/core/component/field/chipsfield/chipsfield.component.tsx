import * as React from 'react';
import * as ramda from 'ramda';

import { uuid } from 'core/util';
import { EntityIdT, IEntity } from 'core/definition.interface';
import { BasicSelect, ISelectOption } from 'core/component/field';

import {
  IChipsFieldInternalProps,
  IChipsFieldInternalState,
  ChipsFieldItemT,
} from './chipsfield.interface';

export class ChipsField extends BasicSelect<ChipsField,
                                            IChipsFieldInternalProps,
                                            IChipsFieldInternalState> {

  public static defaultProps: IChipsFieldInternalProps = {
    labelField: 'name',
    idField: 'id',
  };

  constructor(props: IChipsFieldInternalProps) {
    super(props);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.state = { add: [], remove: [] };
  }

  protected onSelect(option: ISelectOption): void {
    const removeLen = this.state.remove.length;
    const remove = this.state.remove.filter(((removeItem) => removeItem !== option.value));
    let add;

    if (remove.length === removeLen) {
      add = [option.value].concat(this.state.add);
      // Private local state, it should not bind to the view
      this.setState({ add });
    } else {
      add = this.state.add;
      // Private local state, it should not bind to the view
      this.setState({ remove });
    }
    this.onChangeValue({ add, remove, source: this.sourceValue }, null);
  }

  protected toDisplayValue(): string {
    return '';
  }

  protected getAttachment(): JSX.Element {
    return (
        <div>
          {this.activeValue.map((item) =>
            <div key={uuid()}
                 className='app-chipsfield'>
              <span className='app-chipsfield-description'>
                {this.toChipsDisplayValue(item)}
              </span>
              <span className='mdc-toolbar__icon--menu material-icons'
                    onClick={() => this.onDeleteItem(item)}>
                cancel
              </span>
            </div>
        )}
        </div>
    );
  }

  private onDeleteItem(item: ChipsFieldItemT): void {
    const remove = [this.toValue(item)].concat(this.state.remove);

    // Private local state, it should not bind to the view
    this.setState({ remove });

    this.onChangeValue({
      add: this.state.add,
      remove,
      source: this.sourceValue,
    }, null);
  }

  private toChipsDisplayValue(item): string | number {
    const props = this.props;
    const value = this.toValue(item);

    if (!ramda.isNil(value)) {
      const displayValue = this.options.find((option) => option.value === value);
      return displayValue
          ? this.t(displayValue.label)
          : (Reflect.get(item, props.labelField) || value);
    }
    return (item as ISelectOption).label
        ? this.t((item as ISelectOption).label)
        : (item as ISelectOption).value;
  }

  private get activeValue(): ChipsFieldItemT[] {
    return [].concat(this.sourceValue || [])
        .concat(this.addValue)
        .filter((item) =>
            !this.state.remove.find((removeItem) => removeItem === this.toValue(item)));
  }

  private get addValue(): ISelectOption[] {
    return this.options.filter((option) =>
        !!this.state.add.find((addItem) => addItem === option.value));
  }

  private get sourceValue(): IEntity[] {
    return Array.isArray(this.value) ? this.value : this.value.source;
  }

  private toValue(item: ChipsFieldItemT): EntityIdT {
    const props = this.props;
    const idValue = Reflect.get(item, props.idField);
    return idValue || (item as ISelectOption).value;
  }
}
