import { lazyInject, DI_TYPES } from '../../di';
import { IEventManager } from '../../event';
import { IUIFactory } from '../factory';
import { UniversalComponent } from './universal.component';
import { IComponentEntity, IComponent } from '../../entities-definitions.interface';

export class BaseComponent<TComponent extends IComponent<TInternalProps, TInternalState>,
                           TInternalProps = IComponentEntity,
                           TInternalState = {}>
    extends UniversalComponent<TComponent, TInternalProps, TInternalState>
    implements IComponent<TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.UIFactory) protected uiFactory: IUIFactory;
  @lazyInject(DI_TYPES.EventManager) protected eventManager: IEventManager;

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillReceiveProps && plugin.componentWillReceiveProps(nextProps, nextContext));
  }

  public componentWillUpdate(nextProps: Readonly<TInternalProps>, nextState: Readonly<TInternalState>, nextContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillUpdate && plugin.componentWillUpdate(nextProps, nextState, nextContext));
  }

  public get self(): HTMLElement {
    return this.refs.self as HTMLElement;
  }
}
