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
export const provideInSingleton = (target: { new(...args: AnyT[]) }) => provideInSingletonDecorator(target)
  .inSingletonScope()
  .done(true);

/**
 * @stable [26.04.2018]
 * @param {AnyT} contract
 * @param {{new(...args: AnyT[])}} implementation
 * @returns {interfaces.BindingWhenOnSyntax<any>}
 */
export const bindInSingleton = (contract: AnyT, implementation: { new(...args: AnyT[]) }) =>
  appContainer.bind(contract).to(implementation || contract).inSingletonScope();

/**
 * @stable [26.04.2018]
 * @param {AnyT} contract
 * @param {{new(...args: AnyT[])}} implementation
 * @returns {interfaces.BindingWhenOnSyntax<any>}
 */
export const rebindInSingleton = (contract: AnyT, implementation: { new(...args: AnyT[]) }) =>
  appContainer.rebind(contract).to(implementation || contract).inSingletonScope();
