import * as React from 'react';

import {
  ControlledPlaceFieldItemsEnum,
  DictionariesEnum,
  IControlledPlaceFieldConfigEntity,
  IControlledPlaceFieldItemEntity,
  IPlaceFieldProps,
  ISearchPlacesRequestEntity,
} from '../../../definition';
import { ControlledFieldFactory } from '../controlled-field-factory.service';
import {
  PlaceField,
} from '../../field';
import {
  provideInSingleton,
} from '../../../di';
import { mapDictionaryEntity } from '../../../util';

@provideInSingleton(ControlledPlaceFieldFactory)
export class ControlledPlaceFieldFactory
  extends ControlledFieldFactory<IControlledPlaceFieldConfigEntity,
    IControlledPlaceFieldItemEntity,
    ControlledPlaceFieldItemsEnum> {

  /**
   * @stable [11.01.2020]
   */
  constructor() {
    super();
    this.fields.set(ControlledPlaceFieldItemsEnum.PLACE, <PlaceField/>);
  }

  /**
   * @stable [11.01.2020]
   * @param {IControlledPlaceFieldConfigEntity} config
   * @param {IControlledPlaceFieldItemEntity} actualFieldCfg
   * @param {IControlledPlaceFieldItemEntity[]} actualFields
   * @returns {IPlaceFieldProps}
   */
  protected getExtraProps(config: IControlledPlaceFieldConfigEntity,
                          actualFieldCfg: IControlledPlaceFieldItemEntity,
                          actualFields: IControlledPlaceFieldItemEntity[]): IPlaceFieldProps {
    const props = super.getExtraProps(config, actualFieldCfg, actualFields);
    const container = config.container;

    switch (actualFieldCfg.type) {
      case ControlledPlaceFieldItemsEnum.PLACE:
        return {
          ...props,
          options: mapDictionaryEntity(config.container.props.dictionaries.places),
          onFilterChange: (query) => {
            const payloadWrapper: ISearchPlacesRequestEntity = {query};
            this.$dictionaryStoreProxyFactory(container).dispatchLoadDictionary(DictionariesEnum.PLACES, payloadWrapper);
          },
        };
    }
    return props;
  }

  /**
   * @stable [11.01.2020]
   * @param {IControlledPlaceFieldConfigEntity} config
   * @returns {IControlledPlaceFieldItemEntity[]}
   */
  protected getFields(config: IControlledPlaceFieldConfigEntity): IControlledPlaceFieldItemEntity[] {
    return [{
      type: ControlledPlaceFieldItemsEnum.PLACE,
      fieldConfiguration: config.field,
    }];
  }
}
