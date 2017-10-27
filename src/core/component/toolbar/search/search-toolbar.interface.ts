import { IBaseComponentInternalProps, IBaseContainerInternalProps } from '../../../component/base';
import { IApplicationFilterOptions, IApplicationFilterAttributes } from '../../../component/filter';

export interface ISearchToolbarInternalState extends IApplicationFilterAttributes {
}

export interface ISearchToolbarInternalProps extends IBaseComponentInternalProps,
                                                     IApplicationFilterAttributes,
                                                     IApplicationFilterOptions {
  onSearch?(value: string): void;
  onChangeQuery?(value: string): void;
  onFilterAction?(): void;
  onFilter?(): void;
}

export interface ISearchToolbarContainerInternalProps extends IBaseContainerInternalProps {
  filter?: IApplicationFilterAttributes;
  filterOptions?: IApplicationFilterOptions;
  onSearch?(value: string): void;
}
