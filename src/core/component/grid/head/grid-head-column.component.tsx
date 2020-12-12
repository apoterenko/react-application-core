import * as React from 'react';

import {
  GridClassesEnum,
  IconsEnum,
  IGridColumnProps,
  SortDirectionsEnum,
} from '../../../definition';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  NvlUtils,
  ObjectUtils,
  PropsUtils,
  TooltipUtils,
  TypeUtils,
} from '../../../util';
import { BaseGridColumn } from '../base-column';

export class GridHeadColumn extends BaseGridColumn {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IGridColumnProps>({
    headerRendered: true,
  }, BaseGridColumn);

  private readonly hintRef = React.createRef<HTMLElement>();

  /**
   * @stable [09.12.2020]
   * @param originalProps
   */
  constructor(originalProps: IGridColumnProps) {
    super(originalProps);

    this.onAscSortingActionClick = this.onAscSortingActionClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onDescSortingActionClick = this.onDescSortingActionClick.bind(this);
  }

  /**
   * @stable [09.12.2020]
   */
  public componentDidMount() {
    this.doRefreshHint();
  }

  /**
   * @stable [09.12.2020]
   */
  public componentDidUpdate(prevProps: IGridColumnProps) {
    this.doRefreshHint(prevProps);
  }

  /**
   * @stable [09.12.2020]
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      colSpan,
      headerClassName,
      headerColSpan,
      headerRendered,
    } = originalProps;

    return ConditionUtils.orNull(
      headerRendered,
      () => (
        <th
          style={this.styles}
          colSpan={NvlUtils.nvl(headerColSpan, colSpan)}
          className={this.getClassName(CalcUtils.calc(headerClassName, originalProps))}
        >
          {this.columnContentElement}
        </th>
      )
    );
  }

  /**
   * @stable [28.07.2020]
   * @param children
   */
  protected getColumnContentElement(children: React.ReactNode): React.ReactNode {
    const {
      closed,
      sortable,
    } = this.originalProps;

    const hasHint = this.hasHint;
    const haveExtraActions = sortable || hasHint;

    return (
      <React.Fragment>
        {
          haveExtraActions && (
            <div
              className={GridClassesEnum.COLUMN_EXTRA_ACTIONS}
            >
              {
                sortable && (
                  <React.Fragment>
                    {
                      this.uiFactory.makeIcon({
                        className: ClsUtils.joinClassName(
                          GridClassesEnum.EXTRA_ACTION,
                          this.isDescSortingEnabled && GridClassesEnum.ACTIVE_SORT_ACTION
                        ),
                        type: IconsEnum.ARROW_DOWN,
                        onClick: this.onDescSortingActionClick,
                      })
                    }
                    {
                      this.uiFactory.makeIcon({
                        className: ClsUtils.joinClassName(
                          GridClassesEnum.EXTRA_ACTION,
                          this.isAscSortingEnabled && GridClassesEnum.ACTIVE_SORT_ACTION
                        ),
                        type: IconsEnum.ARROW_UP,
                        onClick: this.onAscSortingActionClick,
                      })
                    }
                  </React.Fragment>
                )
              }
              {
                hasHint && React.cloneElement<React.RefAttributes<{}>>(
                  this.uiFactory.makeIcon({
                    className: GridClassesEnum.EXTRA_ACTION,
                    type: IconsEnum.QUESTION,
                  }),
                  {ref: this.hintRef}
                )
              }
            </div>
          )
        }
        {
          this.hasCloseAction
            ? (
              <React.Fragment>
                {children}
                {
                  this.uiFactory.makeIcon({
                    type: closed ? IconsEnum.CHEVRON_DOWN : IconsEnum.CHEVRON_UP,
                    onClick: this.onCloseClick,
                  })
                }
              </React.Fragment>
            )
            : children
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [28.07.2020]
   */
  private onCloseClick(): void {
    const {
      closed,
      onClose,
    } = this.originalProps;

    onClose(!closed);
  }

  /**
   * @stable [28.07.2020]
   */
  private onAscSortingActionClick(): void {
    this.doSortingDirectionChange(ConditionUtils.orNull(!this.isAscSortingEnabled, SortDirectionsEnum.ASC));
  }

  /**
   * @stable [28.07.2020]
   */
  private onDescSortingActionClick(): void {
    this.doSortingDirectionChange(ConditionUtils.orNull(!this.isDescSortingEnabled, SortDirectionsEnum.DESC));
  }

  /**
   * @stable [19.07.2020]
   * @param {SortDirectionsEnum} direction
   */
  private doSortingDirectionChange(direction: SortDirectionsEnum): void {
    const {
      name,
      onSortingDirectionChange,
    } = this.originalProps;

    if (TypeUtils.isFn(onSortingDirectionChange)) {
      onSortingDirectionChange({name, direction});
    }
  }

  /**
   * @stable [08.12.2020]
   * @private
   */
  private doRefreshHint(prevProps?: IGridColumnProps): void {
    const {
      hint,
    } = this.originalProps;

    if (ObjectUtils.isCurrentValueNotEqualPreviousValue(hint, prevProps?.hint)) {
      TooltipUtils.init(this.hintElement, hint);
    }
  }

  /**
   * @stable [26.11.2020]
   * @protected
   */
  protected isActionable(): boolean {
    return super.isActionable() || this.hasHint;
  }

  /**
   * @stable [28.07.2020]
   */
  private get isDescSortingEnabled(): boolean {
    return this.originalProps.direction === SortDirectionsEnum.DESC;
  }

  /**
   * @stable [28.07.2020]
   */
  private get isAscSortingEnabled(): boolean {
    return this.originalProps.direction === SortDirectionsEnum.ASC;
  }

  /**
   * @stable [08.12.2020]
   */
  private get styles(): React.CSSProperties {
    const originalProps = this.originalProps;
    const {
      headerStyle,
      headerWidth,
    } = originalProps;

    return this.getStyle({
      width: headerWidth,
      ...CalcUtils.calc(headerStyle, originalProps),
    });
  }

  /**
   * @stable [26.11.2020]
   * @private
   */
  private get hasHint(): boolean {
    return ObjectUtils.isObjectNotEmpty(this.originalProps.hint);
  }

  /**
   * @stable [08.12.2020]
   * @private
   */
  private get hasCloseAction(): boolean {
    const {
      closable,
      onClose,
    } = this.originalProps;

    return closable && TypeUtils.isFn(onClose);
  }

  /**
   * @stable [26.11.2020]
   * @private
   */
  private get hintElement(): HTMLElement {
    return this.hintRef.current;
  }
}
