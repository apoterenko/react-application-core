import * as React from 'react';
import * as R from 'ramda';
import * as Printf from 'sprintf-js';

import { uuid, isUndef } from '../../../util';
import {
  EntityIdT,
  ID_FIELD_NAME,
  INamedEntity,
  KeyboardEventT,
  NAME_FIELD_NAME,
} from '../../../definition.interface';
import { BasicSelect, IMultiEntity, SelectOptionT } from '../../../component/field';

import {
  IChipsFieldInternalProps,
  IChipsFieldInternalState,
} from './chipsfield.interface';

export class ChipsField extends BasicSelect<ChipsField,
                                            IChipsFieldInternalProps,
                                            IChipsFieldInternalState> {

  public static defaultProps: IChipsFieldInternalProps = {
    valueField: ID_FIELD_NAME,
    labelField: NAME_FIELD_NAME,
    valuesMessage: '%d value(s)',
    clearAction: false,
    forceAll: true,
  };

  constructor(props: IChipsFieldInternalProps) {
    super(props);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  public onKeyBackspace(event: KeyboardEventT): void {
    // Nothing to do, only invoke the props

    if (this.props.onKeyBackspace) {
      this.props.onKeyBackspace(event);
    }
  }

  protected getEmptyValue(): EntityIdT[] {
    return [];
  }

  protected get isValuePresent(): boolean {
    return !isUndef(this.value) && !R.equals(this.value, this.getEmptyValue());
  }

  protected onSelect(option: SelectOptionT): void {
    const removeValues = this.removeValues;
    const addValues = this.addValues;
    const removeLen = removeValues.length;
    const removeArray = removeValues.filter(((removeItem) => removeItem.id !== option.value));
    let addArray = addValues;

    if (removeArray.length === removeLen) {
      const addEntity: INamedEntity = {id: option.value, name: option.label};
      addArray = addValues.concat(addEntity);
    }
    this.dispatchChanges(addArray, removeArray);
  }

  protected toDisplayValue(): string {
    const len = this.activeValues.length;
    return len ? Printf.sprintf(this.t(this.props.valuesMessage), len) : '';
  }

  protected getAttachment(): JSX.Element {
    return (
        <div className='rac-chips-wrapper'>
          {this.activeValues.map((item) => {
            const displayValue = this.toDisplayLabel(item);
            return (
              <div key={uuid()}
                   className='rac-chips'>
                <span className='rac-chips-description rac-overflow-ellipsis'
                      title={String(displayValue)}>
                  {displayValue}
                </span>
                {
                  this.uiFactory.makeIcon({
                    type: 'cancel',
                    disabled: this.isDeactivated(),
                    onClick: () => this.onDeleteItem(item),
                  })
                }
              </div>
            );
          }
        )}
        </div>
    );
  }

  protected toFilteredOptions(options: SelectOptionT[]): SelectOptionT[] {
    return super.toFilteredOptions(options).filter((option) =>
        !this.activeValues.find((item) => item.id === option.value));
  }

  private onDeleteItem(item: INamedEntity): void {
    const removeValues = this.removeValues;
    const addValues = this.addValues;
    const deletedValue = item.id;
    const addLen = addValues.length;
    const addArray = addValues.filter(((addItem) => addItem.id !== deletedValue));
    let removeArray = removeValues;

    if (addArray.length === addLen) {
      const deletedEntity: INamedEntity = {id: deletedValue};
      removeArray = [deletedEntity].concat(removeValues);
    }
    this.dispatchChanges(addArray, removeArray);
  }

  private dispatchChanges(addArray: INamedEntity[], removeArray: INamedEntity[]): void {
    if (this.activeValues.length === 0) {
      this.cleanNativeInputForSupportHTML5Validation();
    }
    if (addArray.length || removeArray.length) {
      this.onChangeValue({ add: addArray, remove: removeArray, source: this.originalValue });
    } else {
      this.onChangeValue(this.originalValue);
    }
    this.setFocus();
  }

  private toDisplayLabel(item: INamedEntity): EntityIdT {
    const props = this.props;
    const value = item.id;

    const selectedOption = this.options.find((option0) => option0.value === value);
    return selectedOption
        ? this.t(selectedOption.label)
        : item.name || value;
  }

  private get activeValues(): INamedEntity[] {
    const props = this.props;
    const originalValue = this.originalValue || [];
    return originalValue
        .map((entity): INamedEntity => ({
          id: Reflect.get(entity, props.valueField),
          name: Reflect.get(entity, props.labelField),
        }))
        .concat(this.addValues)
        .filter((item) => !this.removeValues.find((removeItem) => removeItem.id === item.id));
  }

  private get removeValues(): INamedEntity[] {
    const currentValue = this.value;
    return Array.isArray(currentValue) ? [] : (currentValue as IMultiEntity).remove;
  }

  private get addValues(): INamedEntity[] {
    const currentValue = this.value;
    return Array.isArray(currentValue) ? [] : (currentValue as IMultiEntity).add;
  }

  private get originalValue(): INamedEntity[] {
    const currentValue = this.value;
    return Array.isArray(currentValue)
        ? currentValue
        : (currentValue as IMultiEntity).source;
  }
}
