import { INotUseClassNameWrapper, IClassNameWrapper } from '../../definition.interface';
import {
  IApplicationFilterFormWrapperState,
  IApplicationFilterOptions,
} from '../../component/filter';
import { IListWrapperEntity } from '../../entities-definitions.interface';

export const disabledActionsListWrapperMapper =
    (state: IListWrapperEntity): IApplicationFilterOptions => ({
      disabledActions: state.list.progress,
    });

export const activeClassNameFilterFormWrapperMapper =
    (state: IApplicationFilterFormWrapperState): INotUseClassNameWrapper & IClassNameWrapper => ({
      className: state.filterForm.dirty && 'rac-filter-active',
    });
