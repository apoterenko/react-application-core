import * as R from 'ramda';

import { orNull } from '../../../util';
import { ISelectOption, SelectOptionT } from './basic-select.interface';
import { INamedEntity } from '../../../definitions.interface';
import { IDictionaryEntity } from '../../../entities-definitions.interface';

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

export const toSelectOptionsFromDictionary = <TDictionaryEntityData>(dictionaryEntity: IDictionaryEntity<TDictionaryEntityData>,
                                                                     useIdFilter = false): SelectOptionT[] =>
    toSelectOptions(dictionaryEntity && dictionaryEntity.data, useIdFilter);
