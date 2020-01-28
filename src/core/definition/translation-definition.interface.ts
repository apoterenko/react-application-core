import { IKeyValue } from '../definitions.interface';

/**
 * @stable [28.01.2020]
 */
export type TranslatorT = <TContext = IKeyValue>(key: string, context?: TContext) => string;
