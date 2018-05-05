import { BaseComponent } from '../../component/base';
import {
  INativeMaterialComponent,
  INativeMaterialComponentFactory,
} from './material.interface';
import { IComponentEntity, IComponent } from '../../entities-definitions.interface';

export class MaterialComponent<TComponent extends IComponent<TInternalProps, TInternalState>,
                               TInternalProps extends IComponentEntity,
                               TInternalState,
                               TNativeMaterialComponent extends INativeMaterialComponent>
    extends BaseComponent<TComponent, TInternalProps, TInternalState> {

  private mdc: TNativeMaterialComponent;

  constructor(props: TInternalProps,
              private mdcFactory: INativeMaterialComponentFactory<TNativeMaterialComponent>) {
    super(props);
  }

  public componentDidMount(): void {
    this.mdc = this.mdcFactory ? this.mdcFactory.attachTo(this.self) : null;
    super.componentDidMount();
  }

  public componentWillUnmount(): void {
    if (this.mdc) {
      this.mdc.destroy();
    }
    super.componentWillUnmount();
  }

  protected get nativeMdcInstance(): TNativeMaterialComponent {
    return this.mdc;
  }
}
