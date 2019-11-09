import { DI_TYPES, lazyInject } from '../../di';
import {
  IComponent,
  IDomAccessor,
  ISelectedElementComponentProps,
  IUniversalPlugin,
} from '../../definition';
import { ifNotNilThanValue } from '../../util';

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
    this.refreshScrollPosition();
  }

  /**
   * @stable [08.11.2019]
   */
  private refreshScrollPosition(): void {
    ifNotNilThanValue(this.selectedElement, (selectedElement) => {
      if (!this.domAccessor.isElementVisibleWithinParent(selectedElement, this.component.getSelf())) {
        this.domAccessor.scrollTo(
          selectedElement,
          this.component.getSelf(),
          ifNotNilThanValue(
            this.stickyElement,
            (stickyElement) => ({offsetTop: this.domAccessor.getHeight(stickyElement)}),
            {}
          )
        );
      }
    });
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
