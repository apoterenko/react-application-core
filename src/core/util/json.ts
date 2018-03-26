import { IKeyValue } from '../definition.interface';

export const formatJson = (o: IKeyValue) => JSON.stringify(o, null, 4);
