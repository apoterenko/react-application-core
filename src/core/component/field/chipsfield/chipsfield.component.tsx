import * as React from 'react';

import {
  EntityIdT,
  ID_FIELD_NAME,
  INamedEntity,
  KeyboardEventT,
  NAME_FIELD_NAME,
} from '../../../definition.interface';
import { uuid } from '../../../util';
import { BasicSelect, SelectOptionT, MultiFieldPlugin, MultiFieldEntityT } from '../../field';
import { Chip, ChipsWrapper } from '../../chip';
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
    displayMessage: '%d value(s)',
    clearAction: false,
    forceAll: true,
    displayValue: (value: MultiFieldEntityT<INamedEntity>, field: ChipsField) => {
      const len = field.multiFieldPlugin.getActiveValueLength(value);
      return field.printfDisplayMessage(len > 0, len);
    },
  };

  private multiFieldPlugin = new MultiFieldPlugin(this);

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
    this.multiFieldPlugin.onAddItem({id: option.value, name: option.label});
    this.setFocus();
  }

  protected getAttachment(): JSX.Element {
    return (
        <ChipsWrapper>
          {this.multiFieldPlugin.activeValue.map((item) => (
                  <Chip key={uuid()}
                        disabled={this.isDeactivated()}
                        onClick={() => this.onDelete(item)}>
                    {this.toDisplayLabel(item)}
                  </Chip>
              )
          )}
        </ChipsWrapper>
    );
  }

  protected toFilteredOptions(options: SelectOptionT[]): SelectOptionT[] {
    const activeValue = this.multiFieldPlugin.activeValue;
    return super.toFilteredOptions(options).filter((option) =>
        !activeValue.find((item) => item.id === option.value));
  }

  private onDelete(item: INamedEntity): void {
    this.multiFieldPlugin.onDeleteItem(item);
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
