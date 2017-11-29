import { IComponentPlugin } from '../../../component/plugin';
import { BaseComponentT } from '../../../component/base';
import { IMaterialComponentFactory, INativeMaterialComponent } from '../../../component/material';

export class MaterialPlugin<TComponent extends BaseComponentT,
                            TNativeMaterialComponent extends INativeMaterialComponent>
    implements IComponentPlugin<TComponent, {}, {}> {

  protected mdc: TNativeMaterialComponent;

  constructor(private component: TComponent,
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
