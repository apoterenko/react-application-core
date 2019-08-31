import { UniversalComponent } from './universal.component';
import { IComponent } from '../../entities-definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

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
