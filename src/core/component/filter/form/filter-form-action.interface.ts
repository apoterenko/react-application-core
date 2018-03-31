import { IApplicationFilterFormWrapperState } from '../filter.interface';
import { IListWrapperEntity } from '../../../entities-definitions.interface';

export interface IBuildListAndFilterFormWrapperState extends IListWrapperEntity,
                                                             IApplicationFilterFormWrapperState {
}

export type BuildListAndFilterFormWrapperStateT
    = IBuildListAndFilterFormWrapperState|IListWrapperEntity;
