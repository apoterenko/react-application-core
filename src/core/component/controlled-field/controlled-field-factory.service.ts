import * as React from 'react';
import * as R from 'ramda';
import { injectable } from 'inversify';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  DictionaryStoreProxyFactoryT,
  FormStoreProxyFactoryT,
  IControlledFieldConfigEntity,
  IControlledFieldItemEntity,
  IControlledMappedFieldEntity,
  IFieldConverter,
  IFieldProps,
} from '../../definition';
import { SortUtils } from '../../util';

@injectable()
export class ControlledFieldFactory<
    TConfig extends IControlledFieldConfigEntity<TControlledFieldItemEntity, TControlledFieldItemsEnum>,
    TControlledFieldItemEntity extends IControlledFieldItemEntity<TControlledFieldItemsEnum>,
    TControlledFieldItemsEnum
  > {

  @lazyInject(DI_TYPES.DictionaryStoreProxyFactory) protected readonly $dictionaryStoreProxyFactory: DictionaryStoreProxyFactoryT;
  @lazyInject(DI_TYPES.FieldConverter) protected readonly fieldConverter: IFieldConverter;
  @lazyInject(DI_TYPES.FormStoreProxyFactory) protected readonly $formStoreProxyFactory: FormStoreProxyFactoryT;

  protected readonly fields = new Map<TControlledFieldItemsEnum, JSX.Element>();

  /**
   * @stable [14.10.2020]
   * @param config
   */
  public buildField(config: TConfig): JSX.Element {
    return this.buildFields(config)[0];
  }

  /**
   * @stable [14.10.2020]
   * @param cfg
   */
  public buildFields(cfg: TConfig): JSX.Element[] {
    return this.buildMappedFields(cfg).map((itm) => itm.element);
  }

  /**
   * @stable [14.10.2020]
   * @param cfg
   */
  public buildMappedFields(cfg: TConfig): IControlledMappedFieldEntity<TControlledFieldItemsEnum>[] {
    const actualFields = this.getFields(cfg);
    return (
      actualFields
        .map((actualFieldCfg): IControlledMappedFieldEntity<TControlledFieldItemsEnum> => {
          const fieldConfiguration = actualFieldCfg.fieldConfiguration;
          const fieldEl = this.fields.get(actualFieldCfg.type);

          return {
            element: React.cloneElement(fieldEl, {
              ...fieldConfiguration,
              ...this.getExtraProps(cfg, actualFieldCfg, actualFields),
            }),
            type: actualFieldCfg.type,
          };
        })
    );
  }

  /**
   * @stable [14.10.2020]
   * @param config
   * @protected
   */
  protected getFields(config: IControlledFieldConfigEntity<TControlledFieldItemEntity,
    TControlledFieldItemsEnum>): IControlledFieldItemEntity<TControlledFieldItemsEnum>[] {
    return config.fields || [];
  }

  /**
   * @stable [14.10.2020]
   * @param fields
   * @protected
   */
  protected sortFields(fields: TControlledFieldItemEntity[]): TControlledFieldItemEntity[] {
    return R.sort<TControlledFieldItemEntity>(
      (cfg1, cfg2) => SortUtils.VALUE_ASC_SORTER(cfg1.order, cfg2.order),
      fields
    );
  }

  /**
   * @stable [14.10.2020]
   * @param config
   * @param actualFieldCfg
   * @param actualFields
   * @protected
   */
  protected getExtraProps(config: TConfig,
                          actualFieldCfg: IControlledFieldItemEntity<TControlledFieldItemsEnum>,
                          actualFields: IControlledFieldItemEntity<TControlledFieldItemsEnum>[]): IFieldProps {
    return {};
  }
}
