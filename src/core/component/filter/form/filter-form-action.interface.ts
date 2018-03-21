import { IApplicationListStateWrapper } from '../../../component/list';
import { IApplicationFilterFormWrapperState } from '../filter.interface';

export interface IBuildListAndFilterFormWrapperState extends IApplicationListStateWrapper,
                                                             IApplicationFilterFormWrapperState {
}

export type BuildListAndFilterFormWrapperStateT
    = IBuildListAndFilterFormWrapperState|IApplicationListStateWrapper;
