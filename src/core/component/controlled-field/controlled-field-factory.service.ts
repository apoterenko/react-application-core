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
} from '../../definition';
import { IFieldProps2 } from '../../configurations-definitions.interface';
import { VALUE_ASC_SORTER_FN } from '../../util';

@injectable()
export class ControlledFieldFactory<
    TConfig extends IControlledFieldConfigEntity<TControlledFieldItemEntity, TControlledFieldItemsEnum>,
    TControlledFieldItemEntity extends IControlledFieldItemEntity<TControlledFieldItemsEnum>,
    TControlledFieldItemsEnum
  > {

  @lazyInject(DI_TYPES.DictionaryStoreProxyFactory) protected readonly $dictionaryStoreProxyFactory: DictionaryStoreProxyFactoryT;
  @lazyInject(DI_TYPES.FormStoreProxyFactory) protected readonly $formStoreProxyFactory: FormStoreProxyFactoryT;

  protected readonly fields = new Map<TControlledFieldItemsEnum, JSX.Element>();

  /**
   * @stable [11.01.2020]
   * @param {TConfig} config
   * @returns {JSX.Element}
   */
  public buildField(config: TConfig): JSX.Element {
    return this.buildFields(config)[0];
  }

  /**
   * @stable [06.04.2020]
   * @param {TConfig} cfg
   * @returns {JSX.Element[]}
   */
  public buildFields(cfg: TConfig): JSX.Element[] {
    return this.buildMappedFields(cfg).map((itm) => itm.element);
  }

  /**
   * @stable [06.04.2020]
   * @param {TConfig} cfg
   * @returns {Array<IControlledMappedFieldEntity<TControlledFieldItemsEnum>>}
   */
  public buildMappedFields(cfg: TConfig): Array<IControlledMappedFieldEntity<TControlledFieldItemsEnum>> {
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
   * @stable [11.01.2020]
   * @param {IControlledFieldConfigEntity<TControlledFieldItemEntity extends IControlledFieldItemEntity<TControlledFieldItemsEnum>, TControlledFieldItemsEnum>} config
   * @returns {Array<IControlledFieldItemEntity<TControlledFieldItemsEnum>>}
   */
  protected getFields(config: IControlledFieldConfigEntity<TControlledFieldItemEntity,
    TControlledFieldItemsEnum>): Array<IControlledFieldItemEntity<TControlledFieldItemsEnum>> {
    return config.fields || [];
  }

  /**
   * @stable [11.01.2020]
   * @param {TControlledFieldItemEntity[]} fields
   * @returns {TControlledFieldItemEntity[]}
   */
  protected sortFields(fields: TControlledFieldItemEntity[]): TControlledFieldItemEntity[] {
    return R.sort<TControlledFieldItemEntity>(
      (cfg1, cfg2) => VALUE_ASC_SORTER_FN(cfg1.order, cfg2.order),
      fields
    );
  }

  /**
   * @stable [11.01.2020]
   * @param {TConfig} config
   * @param {IControlledFieldItemEntity<TControlledFieldItemsEnum, IFieldProps2>} actualFieldCfg
   * @param {Array<IControlledFieldItemEntity<TControlledFieldItemsEnum>>} actualFields
   * @returns {IFieldProps2}
   */
  protected getExtraProps(config: TConfig,
                          actualFieldCfg: IControlledFieldItemEntity<TControlledFieldItemsEnum, IFieldProps2>,
                          actualFields: Array<IControlledFieldItemEntity<TControlledFieldItemsEnum>>): IFieldProps2 {
    return {};
  }
}
