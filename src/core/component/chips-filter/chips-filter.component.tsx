import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { toClassName, isString } from '../../util';
import { BaseComponent } from '../base';
import { Chip } from '../chip';
import { IFieldConfiguration } from '../../configurations-definitions.interface';
import { IChipsFilterProps } from './chips-filter.interface';

export class ChipsFilter extends BaseComponent<IChipsFilterProps> {
  private static readonly logger = LoggerFactory.makeLogger('ChipsFilter');

  /**
   * @stable [26.08.2018]
   * @param {IChipsFilterProps} props
   */
  constructor(props: IChipsFilterProps) {
    super(props);
    this.onRemoveFilter = this.onRemoveFilter.bind(this);
  }

  /**
   * @stable [26.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const changes = props.filterForm.changes;
    const changedFieldsNames = Object.keys(changes);

    if (changedFieldsNames.length === 0) {
      return null;
    }

    return (
      <div className={toClassName('rac-chips-filter-wrapper', props.className)}>
        {
          changedFieldsNames.map((changedFieldName) => {
            const fieldConfig = props.fieldsConfigurations[changedFieldName];
            if (R.isNil(fieldConfig)) {
              ChipsFilter.logger.warn(
                `[$ChipsFilter][render] The config is not defined to the field name ${changedFieldName}`
              );
              return null;
            }
            const fieldConfigAsString = fieldConfig as string;
            const fieldConfigAsObject = fieldConfig as IFieldConfiguration;
            const str = isString(fieldConfigAsString) ? fieldConfigAsString : fieldConfigAsObject.label;

            if (R.isNil(str) || R.isEmpty(str)) {
              ChipsFilter.logger.warn(
                `[$ChipsFilter][render] The config is not defined to the field name ${changedFieldName}`
              );
              return null;
            }
            return (
              <Chip key={`chips-filter-item-key-${changedFieldName}`}
                    onClick={() => this.onRemoveFilter(changedFieldName)}>
                {str}
              </Chip>
            );
          })
        }
      </div>
    );
  }

  /**
   * @stable [26.08.2018]
   * @param {string} filterFieldName
   */
  private onRemoveFilter(filterFieldName: string): void {
    const props = this.props;
    if (props.onRemove) {
      props.onRemove(filterFieldName);
    }
  }
}
