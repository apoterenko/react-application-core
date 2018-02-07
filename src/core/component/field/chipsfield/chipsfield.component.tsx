import * as React from 'react';
import * as Printf from 'sprintf-js';

import { uuid } from '../../../util';
import {
  EntityIdT,
  ID_FIELD_NAME,
  INamedEntity,
  KeyboardEventT,
  NAME_FIELD_NAME,
} from '../../../definition.interface';
import { BasicSelect, SelectOptionT, MultiFieldPlugin } from '../../field';
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

  private multiFieldPlugin = new MultiFieldPlugin(this);

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

  protected onSelect(option: SelectOptionT): void {
    const changesResult = this.multiFieldPlugin.onAdd({id: option.value, name: option.label});
    this.dispatchChanges(changesResult.addArray, changesResult.removeArray);
  }

  protected toDisplayValue(): string {
    const len = this.multiFieldPlugin.activeValue.length;
    return len ? Printf.sprintf(this.t(this.props.valuesMessage), len) : '';
  }

  protected getAttachment(): JSX.Element {
    return (
        <div className='rac-chips-wrapper'>
          {this.multiFieldPlugin.activeValue.map((item) => {
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
    const activeValue = this.multiFieldPlugin.activeValue;
    return super.toFilteredOptions(options).filter((option) =>
        !activeValue.find((item) => item.id === option.value));
  }

  private onDeleteItem(item: INamedEntity): void {
    const changesResult = this.multiFieldPlugin.onDelete(item);
    this.dispatchChanges(changesResult.addArray, changesResult.removeArray);
  }

  private dispatchChanges(addArray: INamedEntity[], removeArray: INamedEntity[]): void {
    if (this.multiFieldPlugin.activeValue.length === 0) {
      this.cleanNativeInputForSupportHTML5Validation();
    }
    if (addArray.length || removeArray.length) {
      this.onChangeValue({ add: addArray, remove: removeArray, source: this.multiFieldPlugin.originalValue });
    } else {
      this.onChangeValue(this.multiFieldPlugin.originalValue);
    }
    this.setFocus();
  }

  private toDisplayLabel(item: INamedEntity): EntityIdT {
    const value = item.id;

    const selectedOption = this.options.find((option0) => option0.value === value);
    return selectedOption
        ? this.t(selectedOption.label)
        : item.name || value;
  }
}
