import { IKeyValue } from '../definition.interface';

export type ApplicationTranslatorT = (key: string, params?: IKeyValue) => string;
