import * as React from 'react';

import { GenericComponent } from '../../base/generic.component';
import {
  ClsUtils,
  ConditionUtils,
  FilterUtils,
  NumberUtils,
  NvlUtils,
  TypeUtils,
} from '../../../util';
import {
  GridClassesEnum,
  IGridColumnProps,
} from '../../../definition';

/**
 * @component-impl
 * @stable [09.12.2020]
 */
export class BaseGridColumn<TProps extends IGridColumnProps = IGridColumnProps>
  extends GenericComponent<TProps> {

  public static readonly defaultProps: IGridColumnProps = {
  };

  /**
   * @stable [08.12.2020]
   * @param style
   * @protected
   */
  protected getStyle(style?: React.CSSProperties): React.CSSProperties {
    return FilterUtils.defValuesFilter<React.CSSProperties, React.CSSProperties>({
      width: NvlUtils.nvl(style && style.width, this.originalProps.width),
    });
  }

  /**
   * @stable [08.12.2020]
   * @param classNames
   * @protected
   */
  protected getClassName(...classNames: string[]): string {
    const {
      align,
      edited,
      index,
      indexed,
    } = this.originalProps;

    return ClsUtils.joinClassName(
      GridClassesEnum.COLUMN,
      align && `rac-grid-column-align-${align}`,
      indexed && TypeUtils.isNumber(index) && `rac-grid-column-${index}`,
      edited && GridClassesEnum.COLUMN_EDITED,
      NumberUtils.isOddNumber(index) && GridClassesEnum.COLUMN_ODD,
      this.isActionable() && GridClassesEnum.COLUMN_ACTIONABLE,
      this.isClosable && GridClassesEnum.COLUMN_CLOSABLE,
      ...classNames
    );
  }

  /**
   * @stable [26.11.2020]
   * @protected
   */
  protected isActionable(): boolean {
    const {
      sortable,
    } = this.originalProps;

    return sortable;
  }

  /**
   * @stable [09.12.2020]
   * @protected
   */
  protected get isClosable(): boolean {
    return this.originalProps.closable;
  }

  /**
   * @stable [08.12.2020]
   * @protected
   */
  protected get columnContentElement(): JSX.Element {
    return ConditionUtils.ifNotNilThanValue(
      this.originalChildren,
      (children) => (
        <div
          {...this.getColumnContentProps()}
        >
          {this.getColumnContentElement(children)}
        </div>
      )
    );
  }

  /**
   * @stable [08.12.2020]
   * @protected
   */
  protected getColumnContentProps(): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    return {
      className: GridClassesEnum.COLUMN_CONTENT,
    };
  }

  /**
   * @stable [08.12.2020]
   * @param children
   * @protected
   */
  protected getColumnContentElement(children: React.ReactNode): React.ReactNode {
    return children;
  }
}
