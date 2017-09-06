import { BaseComponent, IBaseComponent } from 'core/component/base';

import {
  INativeMaterialComponent,
  IMaterialComponentFactory
} from './material.interface';

export class MaterialComponent<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
                               TInternalProps,
                               TInternalState,
                               TNativeMaterialComponent extends INativeMaterialComponent>
    extends BaseComponent<TComponent, TInternalProps, TInternalState> {

  private mdc: TNativeMaterialComponent;

  constructor(props: TInternalProps,
              private mdcFactory: IMaterialComponentFactory<TNativeMaterialComponent>) {
    super(props);
  }

  public componentDidMount(): void {
    this.mdc = this.mdcFactory.attachTo(this.refs.self);
    super.componentDidMount();
  }

  public componentWillUnmount(): void {
    this.mdc.destroy();
    super.componentWillUnmount();
  }

  protected get nativeMdcInstance(): TNativeMaterialComponent {
    return this.mdc;
  }
}
