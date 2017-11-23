import { IBaseComponentInternalProps, IBaseContainerInternalProps } from '../../../component/base';
import { IApplicationFilterOptions, IApplicationFilterAttributes } from '../../../component/filter';

export interface ISearchToolbarInternalState extends IApplicationFilterAttributes {
}

export interface ISearchToolbarProps {
  onApply?(value?: string): void;
}

export interface ISearchToolbarInternalProps extends IBaseComponentInternalProps,
                                                     IApplicationFilterAttributes,
                                                     IApplicationFilterOptions,
                                                     ISearchToolbarProps {
  onActivate?(): void;
  onChange?(value: string): void;
  onOpen?(): void;
}

export interface ISearchToolbarContainerInternalProps extends IBaseContainerInternalProps,
                                                              ISearchToolbarProps {
  filter?: IApplicationFilterAttributes;
  filterOptions?: IApplicationFilterOptions;
}
