import { interfaces } from 'inversify';

import { AnyT } from '../definitions.interface';
import { appContainer, provideInSingletonDecorator } from './di.module';

const cachedServices = new Map();

/**
 * @stable [26.04.2018]
 * @param {interfaces.ServiceIdentifier<T>} serviceIdentifier
 * @returns {any}
 */
export const staticInjector = <T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T => {
  // Two-level cache because of a low performance
  let instance = cachedServices.get(serviceIdentifier);
  if (cachedServices.has(serviceIdentifier)) {
    return instance; // Null or instance
  }
  if (appContainer.isBound(serviceIdentifier)) {
    cachedServices.set(serviceIdentifier, instance = appContainer.get<T>(serviceIdentifier));
  } else {
    cachedServices.set(serviceIdentifier, instance = null);
  }
  return instance;
};

/**
 * @stable [26.04.2018]
 * @param target
 * @returns {(target: any) => any}
 */
export const provideInSingleton = (target: interfaces.ServiceIdentifier<AnyT>) => provideInSingletonDecorator(target)
  .inSingletonScope()
  .done(true);

/**
 * @stable [16.09.2019]
 * @param {interfaces.ServiceIdentifier<T> | {new(...args: AnyT[]): T}} contract
 * @param {{new(...args: AnyT[]): T}} implementation
 * @returns {interfaces.BindingWhenOnSyntax<any>}
 */
export const bindInSingleton = <T>(contract: interfaces.ServiceIdentifier<T> | (new(...args: AnyT[]) => T),
                                   implementation?: (new(...args: AnyT[]) => T)) =>
  (
    appContainer.isBound(contract)
      ? appContainer.rebind(contract)
      : appContainer.bind(contract)
  ).to(implementation || contract as (new(...args: AnyT[]) => T)).inSingletonScope();

/**
 * @stable [24.09.2019]
 * @param {interfaces.ServiceIdentifier<T>} contract
 * @param {T} instance
 * @returns {interfaces.BindingWhenOnSyntax<any>}
 */
export const bindToConstantValue = <T>(contract: interfaces.ServiceIdentifier<T>, instance?: T) =>
  (
    appContainer.isBound(contract)
      ? appContainer.rebind(contract)
      : appContainer.bind(contract)
  ).toConstantValue(instance);

/**
 * @stable [08.06.2020]
 */
export class DiSupport {
  public static readonly bindInSingleton = bindInSingleton;
  public static readonly bindToConstantValue = bindToConstantValue;
  public static readonly provideInSingleton = provideInSingleton;
  public static readonly staticInjector = staticInjector;
}
