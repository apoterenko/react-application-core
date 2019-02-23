import { IKeyValue } from '../definitions.interface';

export type TranslatorT = (key: string, params?: IKeyValue) => string;
