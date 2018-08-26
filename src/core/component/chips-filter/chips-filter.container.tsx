import * as React from 'react';

import { BaseContainer } from '../base';
import { IChipsFilterContainerProps } from './chips-filter.interface';
import { IFieldsConfigurations } from '../../configurations-definitions.interface';
import { lazyInject, DI_TYPES } from '../../di';
import { ChipsFilter } from './chips-filter.component';

export class ChipsFilterContainer extends BaseContainer<IChipsFilterContainerProps> {
  @lazyInject(DI_TYPES.FieldsOptions) private fieldsConfigurations: IFieldsConfigurations;

  /**
   * @stable [26.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return <ChipsFilter filterForm={props.filterForm}
                        fieldsConfigurations={this.fieldsConfigurations}
                        onRemove={this.dispatchFormClear}/>;
  }
}
