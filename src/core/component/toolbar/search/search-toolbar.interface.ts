import { IBaseComponentInternalProps, IBaseContainerInternalProps } from '../../../component/base';
import { IApplicationFilterOptions, IApplicationFilterState } from '../../../component/filter';

export interface ISearchToolbarInternalState extends IApplicationFilterState {
}

export interface ISearchToolbarProps {
  onApply?(value?: string): void;
}

export interface ISearchToolbarInternalProps extends IBaseComponentInternalProps,
                                                     IApplicationFilterState,
                                                     IApplicationFilterOptions,
                                                     ISearchToolbarProps {
  onActivate?(): void;
  onChange?(value: string): void;
  onOpen?(): void;
}

export interface ISearchToolbarContainerInternalProps extends IBaseContainerInternalProps,
                                                              ISearchToolbarProps {
  filter?: IApplicationFilterState;
  filterOptions?: IApplicationFilterOptions;
}
