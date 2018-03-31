import { IKeyValue } from '../definitions.interface';

export const formatJson = (o: IKeyValue) => JSON.stringify(o, null, 4);

export const parseJson = (o: string): IKeyValue => {
  try {
    return JSON.parse(o);
  } catch (e) {
    return null;
  }
};
