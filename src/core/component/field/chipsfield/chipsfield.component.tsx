import * as React from 'react';
import * as ramda from 'ramda';

import { uuid } from 'core/util';
import { EntityIdT, IEntity, KeyboardEventT, ChangeEventT } from 'core/definition.interface';
import { BasicSelect, ISelectOption } from 'core/component/field';

import {
  IChipsFieldInternalProps,
  IChipsFieldInternalState,
  ChipsFieldItemT,
} from './chipsfield.interface';

export class ChipsField extends BasicSelect<ChipsField,
                                            IChipsFieldInternalProps,
                                            IChipsFieldInternalState> {

  public static VALUE_SEPARATOR = ',\u00a0';

  public static defaultProps: IChipsFieldInternalProps = {
    labelField: 'name',
    idField: 'id',
  };

  constructor(props: IChipsFieldInternalProps) {
    super(props);
    this.onDeleteItem = this.onDeleteItem.bind(this);

    // Private local state, it should not bind to the view
    this.state = { add: [], remove: [] };
  }

  public onChange(event: ChangeEventT): void {
    // Nothing to do
  }

  public onKeyBackspace(event: KeyboardEventT): void {
    super.onKeyBackspace(event);
    this.deleteItemAccordingCursorPosition();
  }

  protected onSelect(option: ISelectOption): void {
    const removeLen = this.state.remove.length;
    const removeArray = this.state.remove.filter(((removeItem) => removeItem !== option.value));
    let addArray: EntityIdT[];

    if (removeArray.length === removeLen) {
      addArray = this.state.add.concat(option.value);
      this.setState({ add: addArray });
    } else {
      addArray = this.state.add;
      this.setState({ remove: removeArray });
    }
    this.dispatchChanges(addArray, removeArray);
  }

  protected toDisplayValue(): string {
    return this.getActiveValue().map((value) => this.toChipsDisplayValue(value)).join(ChipsField.VALUE_SEPARATOR);
  }

  protected getAttachment(): JSX.Element {
    return (
        <div>
          {this.getActiveValue().map((item) =>
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

  private deleteItemAccordingCursorPosition(): void {
    const activeValue = this.getActiveValue();
    if (!activeValue.length) {
      return;
    }

    const cursorPosition = this.inputCursorPosition;
    let index = 0;
    let result = null;

    activeValue.forEach((item, curIndex) => {
      if (index < cursorPosition) {
        index += String(this.toChipsDisplayValue(item)).length + ChipsField.VALUE_SEPARATOR.length;
      } else if (ramda.isNil(result)) {
        result = curIndex;
      }
    });
    result = ramda.isNil(result) ? activeValue.length : result;
    this.onDeleteItem(activeValue[result - 1]);
  }

  private onDeleteItem(item: ChipsFieldItemT): void {
    const deletedValue = this.toValue(item);
    const addLen = this.state.add.length;
    const addArray = this.state.add.filter(((addItem) => addItem !== deletedValue));
    let removeArray: EntityIdT[];

    if (addArray.length === addLen) {
      removeArray = [deletedValue].concat(this.state.remove);
      this.setState({ remove: removeArray });
    } else {
      removeArray = this.state.remove;
      this.setState({ add: addArray });
    }
    this.dispatchChanges(addArray, removeArray);
  }

  private dispatchChanges(addArray: EntityIdT[], removeArray: EntityIdT[]): void {
    if (!this.getActiveValue(addArray, removeArray).length) {
      this.cleanNativeInputForSupportHTML5Validation();
    }

    if (addArray.length || removeArray.length) {
      this.onChangeValue({ add: addArray, remove: removeArray, source: this.sourceValue }, null);
    } else {
      this.onClearChange();
    }
  }

  private toChipsDisplayValue(item): EntityIdT {
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

  private getActiveValue(add: EntityIdT[] = this.state.add, remove: EntityIdT[] = this.state.remove): ChipsFieldItemT[] {
    return [].concat(this.sourceValue || [])
        .concat(
          add.map((addedValue) => (this.options.find((option) => addedValue === option.value)))
        )
        .filter((item) =>
            !remove.find((removeItem) => removeItem === this.toValue(item)));
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
