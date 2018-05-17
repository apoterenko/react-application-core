import { lazyInject, DI_TYPES } from '../../di';
import { IEventManager } from '../../event';
import { IUIFactory } from '../factory';
import { UniversalComponent } from './universal.component';
import { IComponent } from '../../entities-definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

export class BaseComponent<TComponent extends IComponent<TProps, TState>,
                           TProps extends IComponentProps = IComponentProps,
                           TState = {}>
    extends UniversalComponent<TComponent, TProps, TState>
    implements IComponent<TProps, TState> {

  @lazyInject(DI_TYPES.UIFactory) protected uiFactory: IUIFactory;
  @lazyInject(DI_TYPES.EventManager) protected eventManager: IEventManager;

  public componentWillReceiveProps(nextProps: Readonly<TProps>, nextContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillReceiveProps && plugin.componentWillReceiveProps(nextProps, nextContext));
  }

  public componentWillUpdate(nextProps: Readonly<TProps>, nextState: Readonly<TState>, nextContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillUpdate && plugin.componentWillUpdate(nextProps, nextState, nextContext));
  }
}
