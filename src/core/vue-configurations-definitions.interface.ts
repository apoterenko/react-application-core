import { IUniversalLayoutBuilderConfiguration } from './configurations-definitions.interface';

/**
 * @stable [22.10.2018]
 */
export interface IVueLayoutBuilderConfiguration extends IUniversalLayoutBuilderConfiguration<string> {
}

/**
 * @stable [22.10.2018]
 */
export type VueLayoutBuilderChildrenT = IVueLayoutBuilderConfiguration | string;
