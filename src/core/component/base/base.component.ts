import { IBasicEvent } from '../../definitions.interface';
import { lazyInject, DI_TYPES } from '../../di';
import { IUIFactory } from '../factory';
import { UniversalComponent } from './universal.component';
import { IComponentEntity, IComponent } from '../../entities-definitions.interface';

export class BaseComponent<TComponent extends IComponent<TInternalProps, TInternalState>,
                           TInternalProps = IComponentEntity,
                           TInternalState = {}>
    extends UniversalComponent<TComponent, TInternalProps, TInternalState>
    implements IComponent<TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.UIFactory) protected uiFactory: IUIFactory;

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillReceiveProps && plugin.componentWillReceiveProps(nextProps, nextContext));
  }

  public componentWillUpdate(nextProps: Readonly<TInternalProps>, nextState: Readonly<TInternalState>, nextContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillUpdate && plugin.componentWillUpdate(nextProps, nextState, nextContext));
  }

  public stopEvent(event: IBasicEvent): void {
    if (event.nativeEvent) {
      event.nativeEvent.stopImmediatePropagation();
      event.nativeEvent.stopPropagation();
      event.nativeEvent.preventDefault();
    }
    event.stopPropagation();
    event.preventDefault();
  }

  public get self(): HTMLElement {
    return this.refs.self as HTMLElement;
  }
}
