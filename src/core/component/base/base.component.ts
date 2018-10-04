import { cancelEvent } from '../../util';
import { UniversalComponent } from './universal.component';
import { IComponent } from '../../entities-definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';
import { IBasicEvent } from '../../definitions.interface';

export class BaseComponent<TComponent extends IComponent<TProps, TState>,
                           TProps extends IComponentProps = IComponentProps,
                           TState = {}>
    extends UniversalComponent<TComponent, TProps, TState>
    implements IComponent<TProps, TState> {

  public componentWillUpdate(nextProps: Readonly<TProps>, nextState: Readonly<TState>, nextContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillUpdate && plugin.componentWillUpdate(nextProps, nextState, nextContext));
  }

  /**
   * @stable [18.06.2018]
   * @param {IBasicEvent} event
   */
  public stopEvent(event: IBasicEvent): void {
    cancelEvent(event);
  }

  /**
   * @stable [10.08.2018]
   * @returns {HTMLElement}
   */
  public get selfAsHtmlElement(): HTMLElement {
    return this.self as HTMLElement;
  }
}
