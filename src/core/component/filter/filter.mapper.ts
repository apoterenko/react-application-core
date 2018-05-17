import {
  IApplicationFilterFormWrapperState,
} from '../../component/filter';
import { IListWrapperEntity } from '../../entities-definitions.interface';
import { IFilterActionConfiguration, IFilterConfiguration } from '../../configurations-definitions.interface';

export const actionsDisabledListWrapperMapper =
    (state: IListWrapperEntity): IFilterConfiguration => ({
      actionsDisabled: state.list.progress,
    });

export const activeClassNameFilterFormWrapperMapper =
    (state: IApplicationFilterFormWrapperState): IFilterActionConfiguration => ({
      className: state.filterForm.dirty && 'rac-filter-active',
    });
