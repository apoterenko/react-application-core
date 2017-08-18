import { MDCRipple } from '@material/ripple';

import { IMaterialRippleComponent, IRippleComponentInternalProps } from './ripple.interface';
import { IBaseComponentInternalState } from '../base/base.interface';
import { MaterialComponent } from '../material/material.component';

export class RippleComponent<TInternalProps extends IRippleComponentInternalProps>
    extends MaterialComponent<RippleComponent<TInternalProps>,
                              TInternalProps,
                              IBaseComponentInternalState,
                              IMaterialRippleComponent> {

  constructor(props: TInternalProps) {
    super(props, MDCRipple);
  }

  componentDidMount(): void {
    super.componentDidMount();

    if (this.props.activated) {
      this.instance.activate();
    }
  }
}
