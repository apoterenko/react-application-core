import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IComponent,
  IDomAccessor,
  ISelectedElementComponentProps,
  IUniversalPlugin,
} from '../../definition';
import {
  ifNotNilThanValue,
  isRefreshOnUpdate,
} from '../../util';

export class SelectedElementPlugin implements IUniversalPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  /**
   * @stable [23.10.2019]
   * @param {IComponent} component
   */
  constructor(private readonly component: IComponent<ISelectedElementComponentProps>) {
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
    if (isRefreshOnUpdate(this.component.props)) {
      this.refreshScrollPosition();
    }
  }

  /**
   * @stable [19.12.2019]
   */
  private refreshScrollPosition(): void {
    ifNotNilThanValue(
      this.selectedElement,
      (selectedElement) => {
        const self = this.component.getSelf();
        if (!this.domAccessor.isElementVisibleWithinParent(selectedElement, self)) {
          this.domAccessor.scrollTo(
            selectedElement,
            self,
            ifNotNilThanValue(
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
   * @stable [26.10.2019]
   * @returns {Element}
   */
  private get selectedElement(): Element {
    return this.domAccessor.findElement(
      `.${this.component.props.selectedElementClassName}`, this.component.getSelf()
    );
  }

  /**
   * @stable [08.11.2019]
   * @returns {Element}
   */
  private get stickyElement(): Element {
    return ifNotNilThanValue(
      this.component.props.stickyElementClassName,
      (stickyElementClassName) => this.domAccessor.findElement(`.${stickyElementClassName}`, this.component.getSelf())
    );
  }
}
