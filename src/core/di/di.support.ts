import { interfaces } from 'inversify';

import { AnyT } from '../definitions.interface';
import { appContainer, provideInSingletonDecorator } from './di.module';

/**
 * @stable [26.04.2018]
 * @param {interfaces.ServiceIdentifier<T>} serviceIdentifier
 * @returns {any}
 */
export const staticInjector = <T>(serviceIdentifier: interfaces.ServiceIdentifier<T>) =>
  appContainer.get<T>(serviceIdentifier);

/**
 * @stable [26.04.2018]
 * @param target
 * @returns {(target: any) => any}
 */
export const provideInSingleton = (target: interfaces.ServiceIdentifier<AnyT>) => provideInSingletonDecorator(target)
  .inSingletonScope()
  .done(true);

/**
 * @stable [26.04.2018]
 * @param {interfaces.ServiceIdentifier<T> | {new(...args: AnyT[]): T}} contract
 * @param {{new(...args: AnyT[]): T}} implementation
 * @returns {interfaces.BindingWhenOnSyntax<any>}
 */
export const bindInSingleton = <T>(contract: interfaces.ServiceIdentifier<T> | { new(...args: AnyT[]): T },
                                   implementation: { new(...args: AnyT[]): T }) =>
  appContainer.bind(contract).to(contract as { new(...args: AnyT[]): T } || implementation).inSingletonScope();

/**
 * @stable [26.04.2018]
 * @param {interfaces.ServiceIdentifier<T> | {new(...args: AnyT[]): T}} contract
 * @param {{new(...args: AnyT[]): T}} implementation
 * @returns {interfaces.BindingWhenOnSyntax<any>}
 */
export const rebindInSingleton = <T>(contract: interfaces.ServiceIdentifier<T> | { new(...args: AnyT[]): T },
                                   implementation: { new(...args: AnyT[]): T }) =>
  appContainer.rebind(contract).to(contract as { new(...args: AnyT[]): T } || implementation).inSingletonScope();
