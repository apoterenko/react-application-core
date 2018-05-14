import { IApplicationFilterOptions } from '../../filter';
import { IQueryFilterEntity, IContainerEntity } from '../../../entities-definitions.interface';
import { IComponentProps } from '../../../props-definitions.interface';

export interface ISearchToolbarProps extends IComponentProps,
                                             IQueryFilterEntity,
                                             IApplicationFilterOptions {
  onActivate?(): void;
  onChange?(value: string): void;
  onOpen?(): void;
  onApply?(value?: string): void;
}

export interface ISearchToolbarContainerInternalProps extends IContainerEntity {
  filter?: IQueryFilterEntity;
  filterOptions?: IApplicationFilterOptions;
  onApply?(value?: string): void;
}
