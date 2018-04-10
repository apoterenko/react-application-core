import { IComponentPlugin } from '../../plugin';
import { IDefaultBaseComponent } from '../../base';
import { IMaterialComponentFactory, INativeMaterialComponent } from '../../material';

export class MaterialPlugin<TComponent extends IDefaultBaseComponent,
                            TNativeMaterialComponent extends INativeMaterialComponent>
    implements IComponentPlugin<TComponent, {}, {}> {

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
