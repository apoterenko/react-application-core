import * as React from 'react';

import { EntityIdT } from '../../../definitions.interface';
import { INamedEntity } from '../../../entities-definitions.interface';
import { uuid } from '../../../util';
import { Chip } from '../../chip';
import {
  IChipsFieldProps,
  IChipsFieldState,
} from './chipsfield.interface';
import { MultiField } from '../multifield';

export class ChipsField extends MultiField<ChipsField, IChipsFieldProps, IChipsFieldState> {

  /**
   * @stable [01.06.2018]
   * @returns {JSX.Element}
   */
  protected getAttachmentElement(): JSX.Element {
    return (
      <div className='rac-field-chips-wrapper'>
        {this.multiFieldPlugin.activeValue.map((item) => (
            <Chip key={uuid()}
                  disabled={this.isFieldInactive()}
                  onClick={() => this.onDelete(item)}>
              {this.toDisplayLabel(item)}
            </Chip>
          )
        )}
      </div>
    );
  }

  /**
   * @stable [01.06.2018]
   * @param {INamedEntity} item
   * @returns {EntityIdT}
   */
  private toDisplayLabel(item: INamedEntity): EntityIdT {
    const value = item.id;

    const selectedOption = this.options.find((option0) => option0.value === value);
    return selectedOption
      ? this.t(selectedOption.label)
      : (item.name || value);
  }
}
