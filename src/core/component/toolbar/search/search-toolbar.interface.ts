import { IApplicationFilterOptions } from '../../filter';
import { IQueryFilterEntity, IContainerEntity, IComponentEntity } from '../../../entities-definitions.interface';

export interface ISearchToolbarProps {
  onApply?(value?: string): void;
}

export interface ISearchToolbarInternalProps extends IComponentEntity,
                                                     IQueryFilterEntity,
                                                     IApplicationFilterOptions,
                                                     ISearchToolbarProps {
  onActivate?(): void;
  onChange?(value: string): void;
  onOpen?(): void;
}

export interface ISearchToolbarContainerInternalProps extends IContainerEntity,
                                                              ISearchToolbarProps {
  filter?: IQueryFilterEntity;
  filterOptions?: IApplicationFilterOptions;
}
