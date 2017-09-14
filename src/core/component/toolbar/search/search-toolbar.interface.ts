import { IBaseComponentInternalProps, IBaseContainerInternalProps } from 'core/component/base';
import { IApplicationFilterAttributes } from 'core/component/filter';

export interface ISearchToolbarInternalState extends IApplicationFilterAttributes {
}

export interface ISearchToolbarInternalProps
    extends IBaseComponentInternalProps, IApplicationFilterAttributes {
  onSearch?(value: string): void;
  onChangeQuery?(value: string): void;
  onFilterAction?(): void;
  onFilter?(): void;
}

export interface ISearchToolbarContainerInternalProps extends IBaseContainerInternalProps {
  filter: IApplicationFilterAttributes;
  onSearch?(value: string): void;
}
