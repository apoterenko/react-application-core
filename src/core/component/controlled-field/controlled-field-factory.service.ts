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
} from '../../definition';
import { IFieldProps } from '../../configurations-definitions.interface';
import {
  VALUE_ASC_SORTER_FN,
} from '../../util';

@injectable()
export class ControlledFieldFactory<TConfig extends IControlledFieldConfigEntity<TControlledFieldItemEntity, TControlledFieldItemsEnum>,
  TControlledFieldItemEntity extends IControlledFieldItemEntity<TControlledFieldItemsEnum>,
  TControlledFieldItemsEnum> {

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
   * @stable [18.12.2019]
   * @param {TConfig} config
   * @returns {React.ReactNode}
   */
  public buildFields(config: TConfig): JSX.Element[] {
    const actualFields = this.getFields(config);
    return (
      actualFields
        .map((actualFieldCfg) => {
          const fieldConfiguration = actualFieldCfg.fieldConfiguration;
          const fieldEl = this.fields.get(actualFieldCfg.type);

          return React.cloneElement(fieldEl, {
            ...fieldConfiguration,
            ...this.getExtraProps(config, actualFieldCfg, actualFields),
          });
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
   * @param {IControlledFieldItemEntity<TControlledFieldItemsEnum, IFieldProps>} actualFieldCfg
   * @param {Array<IControlledFieldItemEntity<TControlledFieldItemsEnum>>} actualFields
   * @returns {IFieldProps}
   */
  protected getExtraProps(config: TConfig,
                          actualFieldCfg: IControlledFieldItemEntity<TControlledFieldItemsEnum, IFieldProps>,
                          actualFields: Array<IControlledFieldItemEntity<TControlledFieldItemsEnum>>): IFieldProps {
    return {};
  }
}
