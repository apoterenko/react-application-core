import { IBaseComponentInternalProps, IBaseContainerInternalProps } from '../../base';
import { IApplicationFilterOptions } from '../../filter';
import { IQueryFilterEntity } from '../../../entities-definitions.interface';

export interface ISearchToolbarProps {
  onApply?(value?: string): void;
}

export interface ISearchToolbarInternalProps extends IBaseComponentInternalProps,
                                                     IQueryFilterEntity,
                                                     IApplicationFilterOptions,
                                                     ISearchToolbarProps {
  onActivate?(): void;
  onChange?(value: string): void;
  onOpen?(): void;
}

export interface ISearchToolbarContainerInternalProps extends IBaseContainerInternalProps,
                                                              ISearchToolbarProps {
  filter?: IQueryFilterEntity;
  filterOptions?: IApplicationFilterOptions;
}
