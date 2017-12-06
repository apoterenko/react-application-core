import { IApplicationListWrapperState } from '../../../component/list';
import { IApplicationFilterFormWrapperState } from '../filter.interface';

export interface IBuildListAndFilterFormWrapperState extends IApplicationListWrapperState,
                                                             IApplicationFilterFormWrapperState {
}

export type BuildListAndFilterFormWrapperStateT
    = IBuildListAndFilterFormWrapperState|IApplicationListWrapperState;
