import { IUniversalComponentPlugin, IComponent } from '../../../entities-definitions.interface';
import { IMaterialComponentFactory, INativeMaterialComponent } from '../../material';

export class MaterialPlugin<TComponent extends IComponent,
                            TNativeMaterialComponent extends INativeMaterialComponent>
    implements IUniversalComponentPlugin {

  protected mdc: TNativeMaterialComponent;

  constructor(protected component: TComponent,
              private mdcFactory: IMaterialComponentFactory<TNativeMaterialComponent>) {
  }

  public componentDidMount(): void {
    this.mdc = this.mdcFactory.attachTo(this.component.self);
  }

  public componentWillUnmount(): void {
    if (this.mdc) {
      this.mdc.destroy();
    }
  }
}
