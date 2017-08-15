import { IMaterialComponent, IMaterialComponentFactory } from './material.interface';
import { IBaseComponent } from '../base/base.interface';
import { BaseComponent } from '../base/base.component';

export class MaterialComponent<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
    TInternalProps,
    TInternalState,
    TMaterialComponent extends IMaterialComponent>
    extends BaseComponent<TComponent, TInternalProps, TInternalState> {

  private mdc: TMaterialComponent;

  constructor(props: TInternalProps,
              private mdcFactory: IMaterialComponentFactory<TMaterialComponent>) {
    super(props);
  }

  componentDidMount(): void {
    this.mdc = this.mdcFactory.attachTo(this.refs.self);
    super.componentDidMount();
  }

  componentWillUnmount(): void {
    this.mdc.destroy();
    super.componentWillUnmount();
  }

  protected get instance(): TMaterialComponent {
    return this.mdc;
  }
}
