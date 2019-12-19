import * as React from 'react';
import * as R from 'ramda';
import { injectable } from 'inversify';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  FormStoreProxyFactoryT,
  ICompositeFieldConfigEntity,
  ICompositeFieldItemEntity,
} from '../../definition';
import { IFieldProps } from '../../configurations-definitions.interface';
import { VALUE_ASC_SORTER_FN } from '../../util';

@injectable()
export class CompositeFieldFactory<TConfig extends ICompositeFieldConfigEntity<TCompositeFieldItemEntity, TCompositeFieldItemsEnum>,
  TCompositeFieldItemEntity extends ICompositeFieldItemEntity<TCompositeFieldItemsEnum>,
  TCompositeFieldItemsEnum> {
  @lazyInject(DI_TYPES.FormStoreProxyFactory) protected readonly formStoreProxyFactory: FormStoreProxyFactoryT;

  protected readonly fields = new Map<TCompositeFieldItemsEnum, JSX.Element>();

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
   * @stable [18.12.2019]
   * @param {ICompositeFieldConfigEntity<TCompositeFieldItemEntity extends ICompositeFieldItemEntity<TTCompositeFieldItemsEnum>, TTCompositeFieldItemsEnum>} config
   * @returns {Array<ICompositeFieldItemEntity<TTCompositeFieldItemsEnum>>}
   */
  protected getFields(config: ICompositeFieldConfigEntity<TCompositeFieldItemEntity,
    TCompositeFieldItemsEnum>): Array<ICompositeFieldItemEntity<TCompositeFieldItemsEnum>> {
    return config.fields || [];
  }

  /**
   * @stable [18.12.2019]
   * @param {TCompositeFieldItemEntity[]} fields
   * @returns {TCompositeFieldItemEntity[]}
   */
  protected sortAndFilterFields(fields: TCompositeFieldItemEntity[]): TCompositeFieldItemEntity[] {
    return R.sort<TCompositeFieldItemEntity>(
      (cfg1, cfg2) => VALUE_ASC_SORTER_FN(cfg1.order, cfg2.order),
      fields.filter((cfg) => cfg.rendered !== false)
    );
  }

  /**
   * @stable [18.12.2019]
   * @param {TConfig} config
   * @param {ICompositeFieldItemEntity<TCompositeFieldItemsEnum, IFieldProps>} actualFieldCfg
   * @param {Array<ICompositeFieldItemEntity<TCompositeFieldItemsEnum>>} actualFields
   * @returns {IFieldProps}
   */
  protected getExtraProps(config: TConfig,
                          actualFieldCfg: ICompositeFieldItemEntity<TCompositeFieldItemsEnum, IFieldProps>,
                          actualFields: Array<ICompositeFieldItemEntity<TCompositeFieldItemsEnum>>): IFieldProps {
    return {};
  }
}
