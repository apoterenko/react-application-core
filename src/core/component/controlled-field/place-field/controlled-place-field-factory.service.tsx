import * as React from 'react';

import {
  ControlledPlaceFieldItemsEnum,
  DictionariesEnum,
  IControlledPlaceFieldConfigEntity,
  IControlledPlaceFieldItemEntity,
  IPlaceFieldProps,
  ISearchPlacesPayloadEntity,
} from '../../../definition';
import { ControlledFieldFactory } from '../controlled-field-factory.service';
import {
  PlaceField,
} from '../../field';
import {
  provideInSingleton,
} from '../../../di';
import { mapDictionaryEntityField } from '../../../util';

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
    const extraProps = super.getExtraProps(config, actualFieldCfg, actualFields);
    const container = config.container;

    switch (actualFieldCfg.type) {
      case ControlledPlaceFieldItemsEnum.PLACE:
        return {
          ...extraProps,
          ...mapDictionaryEntityField(config.container.props.dictionaries.places),
          onFilterChange: (query) => {
            const payloadWrapper: ISearchPlacesPayloadEntity = {payload: {query}};
            this.$dictionaryStoreProxyFactory(container).dispatchLoadDictionary(DictionariesEnum.PLACES, payloadWrapper);
          },
        };
    }
    return extraProps;
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
