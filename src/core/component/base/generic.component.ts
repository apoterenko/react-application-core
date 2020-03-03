import * as React from 'react';

import { AnyT } from '../../definitions.interface';
import { IGenericComponentProps } from '../../definition';
import { patchRenderMethod } from '../../util';

export class GenericComponent<TProps extends IGenericComponentProps = IGenericComponentProps,
  TState = {},
  TSelfRef = AnyT>
  extends React.PureComponent<TProps, TState> {

  protected readonly selfRef = React.createRef<TSelfRef>();

  /**
   * @stable [27.02.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    patchRenderMethod(this);
  }
}
