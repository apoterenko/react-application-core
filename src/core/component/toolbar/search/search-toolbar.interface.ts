import { IBaseComponentInternalProps } from 'core/component/base';

export interface ISearchToolbarInternalState {
  activated: boolean;
}

export interface ISearchToolbarInternalProps extends IBaseComponentInternalProps {
  onSearch?(value: string): void;
  onFilter?(): void;
}
