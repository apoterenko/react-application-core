import { Component } from 'react';
import { Store } from 'redux';

import {
  IKeyValue,
  AnyT,
} from '../../definitions.interface';
import { IUniversalContainerEntity } from '../../entities-definitions.interface';
import {
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_BACK_ACTION_TYPE,
} from '../../router/router.interface';
import {
  IUniversalBaseContainer,
} from './universal-base.interface';

export class UniversalBaseContainer<TInternalProps extends IUniversalContainerEntity,
                                    TInternalState>
  extends Component<TInternalProps, TInternalState>
  implements IUniversalBaseContainer<TInternalProps, TInternalState> {

  protected appStore: Store<{}>;

  /**
   * @stable - 12.04.2018
   * @param {TInternalProps} props
   * @param {string} sectionName
   */
  constructor(props: TInternalProps, public sectionName = 'section') {
    super(props);
    this.sectionName = props.sectionName || sectionName;
    this.navigateToBack = this.navigateToBack.bind(this);
  }

  /**
   * @stable - 12.04.2018
   * @param {string} type
   * @param {IKeyValue} data
   */
  public dispatch(type: string, data?: IKeyValue): void {
    this.dispatchCustomType(`${this.sectionName}.${type}`, { section: this.sectionName, ...data });
  }

  /**
   * @stable - 12.04.2018
   * @param {TPath} path
   * @param {TState} state
   */
  public navigate<TPath, TState>(path: TPath, state?: TState): void {
    this.dispatchCustomType(ROUTER_NAVIGATE_ACTION_TYPE, { path, state });
  }

  /**
   * @stable - 12.04.2018
   */
  protected navigateToBack(): void {
    this.dispatchCustomType(ROUTER_BACK_ACTION_TYPE);
  }

  /**
   * Service method (DRY)
   * @stable - 12.04.2018
   * @param {string} operationId
   * @returns {boolean}
   */
  protected isTransportContainsExecutingOperation(operationId: string): boolean {
    return this.props.transport.queue.includes(operationId);
  }

  /**
   * @stable - 12.04.2018
   * @param {string} type
   * @param {AnyT} data
   */
  protected dispatchCustomType(type: string, data?: AnyT): void {
    this.appStore.dispatch({ type, data });
  }
}
