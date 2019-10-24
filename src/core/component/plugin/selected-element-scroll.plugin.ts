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
    const self = this.component.getSelf();
    ifNotNilThanValue(
      this.domAccessor.findElement(`.${this.component.props.selectedElementClassName}`, self),
      (selectedElement) => this.domAccessor.scrollTo(selectedElement, self)
    );
  }
}
