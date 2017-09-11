import { IEntity } from 'core/definition.interface';

export interface IApplicationListState {
  progress: boolean;
  locked: boolean;
  data: IEntity[];
  selected: IEntity;
}

export const INITIAL_APPLICATION_LIST_STATE: IApplicationListState = {
  progress: false,
  locked: false,
  data: null,
  selected: null,
};
