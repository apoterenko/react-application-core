import { BaseComponent, IBaseComponent, IBaseComponentInternalProps } from '../../component/base';

import {
  INativeMaterialComponent,
  IMaterialComponentFactory,
} from './material.interface';

export class MaterialComponent<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
                               TInternalProps extends IBaseComponentInternalProps,
                               TInternalState,
                               TNativeMaterialComponent extends INativeMaterialComponent>
    extends BaseComponent<TComponent, TInternalProps, TInternalState> {

  private mdc: TNativeMaterialComponent;

  constructor(props: TInternalProps,
              private mdcFactory: IMaterialComponentFactory<TNativeMaterialComponent>) {
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

  public get self(): HTMLElement {
    return this.refs.self as HTMLElement;
  }
}
