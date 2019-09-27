import * as React from 'react';
import * as R from 'ramda';

import { Chip } from '../../chip';
import { coalesce, NAME_ASC_SORTER_FN, uuid } from '../../../util';
import { EntityIdT } from '../../../definitions.interface';
import { IChipsFieldProps, IChipsFieldState } from './chipsfield.interface';
import { INamedEntity } from '../../../definition';
import { MultiField } from '../multifield';

export class ChipsField extends MultiField<IChipsFieldProps, IChipsFieldState> {

  /**
   * @stable [01.06.2018]
   * @returns {JSX.Element}
   */
  protected getAttachmentElement(): JSX.Element {
    return (
      <div className='rac-field-chips-wrapper'>
        {R.sort((o1, o2) => NAME_ASC_SORTER_FN(o1.name, o2.name),
          this.multiFieldPlugin.activeValue).map((item) => {
            const id = coalesce(item.id, item.value, uuid());
            return (
              <Chip
                key={id}
                id={id}
                disabled={this.isFieldInactive()}
                onClick={() => this.onDelete(item)}>
                {this.toDisplayLabel(item)}
              </Chip>
            );
          }
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
    const id = item.id;

    const selectedOption = this.options.find((option0) => option0.value === id);
    return selectedOption
      ? this.t(selectedOption.label)
      : (item.name || id);
  }
}
