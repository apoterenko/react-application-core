import * as React from 'react';
import * as R from 'ramda';

import { InlineOption } from '../../inline-option';
import {
  CalcUtils,
  ClsUtils,
  ObjectUtils,
  PropsUtils,
  SortUtils,
} from '../../../util';
import {
  ChipsFieldClassesEnum,
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
   * @stable [15.10.2020]
   * @protected
   */
  protected get attachmentBodyElement(): JSX.Element {
    const inlineOptions = this.inlineOptions;
    if (ObjectUtils.isObjectEmpty(inlineOptions)) {
      return null;
    }

    return (
      <React.Fragment>
        {inlineOptions.map((item) => this.getInlineOptionElement(item))}
      </React.Fragment>
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
      inlineOptionConfiguration,
    } = this.originalProps;

    const {
      className: inlineOptionClassName,
    } = inlineOptionConfiguration || {};

    return (
      <InlineOption
        disabled={this.isInactive}
        option={this.fieldConverter.fromNamedEntityToRawDataLabeledValueEntity(item)}
        onClose={() => this.onDelete(item)}
        {...inlineOptionConfiguration}
        key={`key-${item.id}`}
        className={
          ClsUtils.joinClassName(
            CalcUtils.calc(inlineOptionClassName),
            ChipsFieldClassesEnum.CHIPS_FIELD_INLINE_OPTION
          )
        }
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
