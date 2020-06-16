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
  FieldClassesEnum,
  IChipsFieldProps,
  INamedEntity,
} from '../../../definition';
import { MultiField } from '../multifield/multifield.component';

/**
 * @component-impl
 * @stable [16.06.2020]
 */
export class ChipsField extends MultiField<IChipsFieldProps> {

  /**
   * @stable [16.06.2020]
   * @returns {JSX.Element}
   */
  protected get attachmentElement(): JSX.Element {
    const mergedProps = this.mergedProps;
    return (
      <div
        className={FieldClassesEnum.FIELD_ATTACHMENT}
      >
        {this.chips.map((item) => this.getChipElement(item, mergedProps))}
      </div>
    );
  }

  /**
   * @stable [16.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      ChipsFieldClassesEnum.CHIPS_FIELD
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
        id={id}
        key={`key-${id}`}
        disabled={this.isInactive}
        className={
          ClsUtils.joinClassName(
            chipClassName,
            ChipsFieldClassesEnum.CHIPS_FIELD_CHIP
          )
        }
        onClick={() => this.onDelete(item)}
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
