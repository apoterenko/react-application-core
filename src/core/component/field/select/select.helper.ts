import * as R from 'ramda';

import { orNull } from '../../../util';
import { ISelectOption, SelectOptionT } from './basic-select.interface';
import { INamedEntity } from '../../../definition.interface';

export const toSelectOptions = (data: INamedEntity[] | INamedEntity, useIdFilter = false): SelectOptionT[] =>
  orNull<SelectOptionT[]>(
    data,
    () => R.sort<INamedEntity>(
      useIdFilter
        ? (item1, item2) => item1.id === item2.id ? 0 : (item1.id > item2.id ? 1 : -1)
        : (item1, item2) => String(item1.name || item1.id).localeCompare(String(item2.name || item2.id)),
      [].concat(data)
    )
      .map<SelectOptionT>((entity) => ({
        value: entity.id,
        label: entity.name,
        rawData: entity,
      }))
  );
