import { AnyT } from '../../definitions.interface';
import { GenericBaseComponent } from './generic-base.component';
import { IGenericComponentProps } from '../../definition';
import { patchRenderMethod } from '../../util';

export class GenericComponent<TProps extends IGenericComponentProps = IGenericComponentProps,
  TState = {},
  TSelfRef = AnyT>
  extends GenericBaseComponent<TProps, TState, TSelfRef> {

  /**
   * @stable [27.02.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    patchRenderMethod(this);
  }
}
