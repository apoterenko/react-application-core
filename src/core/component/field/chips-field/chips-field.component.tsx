import * as React from 'react';
import * as R from 'ramda';

import { InlineOption } from '../../inline-option';
import {
  ClsUtils,
  PropsUtils,
  SortUtils,
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

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IChipsFieldProps>({}, MultiField);

  /**
   * @stable [08.07.2020]
   * @returns {JSX.Element}
   */
  protected get attachmentElement(): JSX.Element {
    return (
      <div
        className={FieldClassesEnum.ATTACHMENT}
      >
        {this.inlineOptions.map((item) => this.getInlineOptionElement(item))}
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
   * @stable [08.07.2020]
   * @param {INamedEntity} item
   * @returns {JSX.Element}
   */
  private getInlineOptionElement(item: INamedEntity): JSX.Element {
    const {
      inlineOptionClassName,
    } = this.originalProps;

    return (
      <InlineOption
        key={`key-${item.id}`}
        disabled={this.isInactive}
        className={
          ClsUtils.joinClassName(
            inlineOptionClassName,
            ChipsFieldClassesEnum.CHIPS_FIELD_INLINE_OPTION
          )
        }
        option={this.fieldConverter.fromNamedEntityToRawDataLabeledValueEntity(item)}
        onClose={() => this.onDelete(item)}
      />
    );
  }

  /**
   * @stable [16.06.2020]
   * @returns {INamedEntity[]}
   */
  private get inlineOptions(): INamedEntity[] {
    return R.sort(
      (o1, o2) => SortUtils.NAME_ASC_SORTER(o1.name, o2.name),
      this.multiFieldPlugin.activeValue
    );
  }
}
