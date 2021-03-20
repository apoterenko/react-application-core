import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IDomAccessor,
  IGenericComponent,
  IGenericPlugin,
  ISelectedElementComponentProps,
} from '../../definition';
import {
  ConditionUtils,
  WrapperUtils,
} from '../../util';

export class SelectedElementPlugin implements IGenericPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  /**
   * @stable [23.10.2019]
   * @param {IGenericComponent} component
   */
  constructor(private readonly component: IGenericComponent<ISelectedElementComponentProps>) {
  }

  /**
   * @stable [23.10.2019]
   */
  public componentDidMount() {
    this.refreshScrollPosition();
  }

  /**
   * @stable [25.10.2019]
   */
  public componentDidUpdate() {
    if (WrapperUtils.isRefreshOnUpdateNeeded(this.originalProps)) {
      this.refreshScrollPosition();
    }
  }

  /**
   * @stable [19.12.2019]
   */
  private refreshScrollPosition(): void {
    ConditionUtils.ifNotNilThanValue(
      this.selectedElement,
      (selectedElement) => {
        const self = this.selfRef;

        if (!this.domAccessor.isElementVisibleWithinParent(selectedElement, self)) {
          this.domAccessor.scrollIntoView(
            selectedElement,
            self,
            ConditionUtils.ifNotNilThanValue(
              this.stickyElement,
              (stickyElement) => ({offsetTop: this.domAccessor.getHeight(stickyElement)}),
              {}
            )
          );
        }
      }
    );
  }

  /**
   * @stable [20.05.2020]
   * @returns {Element}
   */
  private get selectedElement(): Element {
    return ConditionUtils.ifNotEmptyThanValue(
      this.originalProps.selectedElementClassName,
      (selectedElementClassName) =>
        this.domAccessor.findElement(this.domAccessor.asSelector(selectedElementClassName), this.selfRef)
    );
  }

  /**
   * @stable [20.05.2020]
   * @returns {Element}
   */
  private get stickyElement(): Element {
    return ConditionUtils.ifNotEmptyThanValue(
      this.originalProps.stickyElementClassName,
      (stickyElementClassName) =>
        this.domAccessor.findElement(this.domAccessor.asSelector(stickyElementClassName), this.selfRef)
    );
  }

  /**
   * @stable [08.06.2020]
   * @returns {ISelectedElementComponentProps}
   */
  private get originalProps(): ISelectedElementComponentProps {
    return this.component.props;
  }

  /**
   * @stable [21.04.2020]
   * @returns {HTMLElement}
   */
  private get selfRef(): HTMLElement {
    return this.component.actualRef.current;
  }
}
