import * as React from 'react';
import * as R from 'ramda';

import { Chip } from '../../chip';
import {
  ClsUtils,
  NvlUtils,
  SortUtils,
  UuidUtils,
} from '../../../util';
import {
  ChipsFieldClassesEnum,
  IChipsFieldProps,
  INamedEntity,
} from '../../../definition';
import { MultiField } from '../multifield/multifield.component';

export class ChipsField extends MultiField<IChipsFieldProps> {

  /**
   * @stable [16.06.2020]
   * @returns {JSX.Element}
   */
  protected getAttachmentElement(): JSX.Element {
    const mergedProps = this.mergedProps;
    return (
      <div
        className={ChipsFieldClassesEnum.FIELD_CHIPS}
      >
        {this.chips.map((item) => this.getChipElement(item, this.mergedProps))}
      </div>
    );
  }

  /**
   * @stable [16.06.2020]
   * @param {INamedEntity} item
   * @param {IChipsFieldProps} mergedProps
   * @returns {JSX.Element}
   */
  private getChipElement(item: INamedEntity, mergedProps: IChipsFieldProps): JSX.Element {
    const {
      chipClassName,
    } = mergedProps;

    const id = NvlUtils.coalesce(item.id, UuidUtils.uuid());

    return (
      <Chip
        key={id}
        id={id}
        disabled={this.isInactive}
        onClick={() => this.onDelete(item)}
        className={ClsUtils.joinClassName(
          chipClassName,
          ChipsFieldClassesEnum.FIELD_CHIP
        )}
      >
        {item.name}
      </Chip>
    );
  }

  /**
   * @stable [16.06.2020]
   * @returns {INamedEntity[]}
   */
  private get chips(): INamedEntity[] {
    return R.sort(
      (o1, o2) => SortUtils.NAME_ASC_SORTER(o1.name, o2.name),
      this.multiFieldPlugin.activeValue
    );
  }
}
