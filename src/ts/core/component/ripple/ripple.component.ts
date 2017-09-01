import { MDCRipple } from '@material/ripple';

import { IBaseComponentInternalState } from 'core/component/base';
import { MaterialComponent } from 'core/component/material';

import { INativeMaterialRippleComponent, IRippleComponentInternalProps } from './ripple.interface';

export class RippleComponent<TInternalProps extends IRippleComponentInternalProps>
    extends MaterialComponent<RippleComponent<TInternalProps>,
                              TInternalProps,
                              IBaseComponentInternalState,
                              INativeMaterialRippleComponent> {

  constructor(props: TInternalProps) {
    super(props, MDCRipple);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (this.props.activated) {
      this.nativeMdcInstance.activate();
    }
  }
}
