import { INamedConstructor } from '../definition';

/**
 * @stable [11.09.2019]
 * @param {string} name
 * @returns {(constructor: T) => void}
 */
export const namedConstructor = <T extends INamedConstructor>(name: string) =>
  (constructor: T) => {
    constructor.$$name = name;
  };
