import { UniversalComponent } from './universal.component';
import { IComponentProps, IComponent } from '../../definition';

/**
 * TODO
 * @deprecated
 */
export class BaseComponent<TProps extends IComponentProps = IComponentProps,
                           TState = {}>
    extends UniversalComponent<TProps, TState>
    implements IComponent<TProps, TState> {

  /**
   * @stable [01.12.2018]
   * @returns {HTMLElement}
   */
  public getSelf(): HTMLElement {
    return super.getSelf() as HTMLElement;
  }
}
