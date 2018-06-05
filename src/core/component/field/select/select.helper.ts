import * as R from 'ramda';

import { orNull } from '../../../util';
import { IDictionaryEntity, INamedEntity, ISelectOptionEntity } from '../../../entities-definitions.interface';

// TODO destroy
export const toSelectOptions = (data: INamedEntity[] | INamedEntity,
                                useIdSorter = false,
                                predicate = (item: INamedEntity) => true): ISelectOptionEntity[] =>
  orNull<ISelectOptionEntity[]>(
    data,
    () => R.sort<INamedEntity>(
            useIdSorter
              ? (item1, item2) => item1.id === item2.id ? 0 : (item1.id > item2.id ? 1 : -1)
              : (item1, item2) => String(item1.name || item1.id).localeCompare(String(item2.name || item2.id)),
            R.filter<INamedEntity>(predicate, [].concat(data))
          )
          .map<ISelectOptionEntity>((entity) => ({
            value: entity.id,
            label: entity.name,
            rawData: entity,
          }))
  );

// TODO destroy
export const toSelectOptionsFromDictionary = <TDictionaryEntityData>(dictionaryEntity: IDictionaryEntity<TDictionaryEntityData>,
                                                                     useIdFilter = false,
                                                                     predicate = (item: INamedEntity) => true): ISelectOptionEntity[] =>
    toSelectOptions(dictionaryEntity && dictionaryEntity.data, useIdFilter, predicate);
