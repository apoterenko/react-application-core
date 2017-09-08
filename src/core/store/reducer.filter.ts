import { Reducer } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';

export type Filter = (action: IEffectsAction) => boolean;

export function filterReducer<S>(reducer: Reducer<S>, filter: Filter): Reducer<S> {
  return (state, action) => (filter(action) ? reducer(state, action) : state);
}

export function reducerSectionFilter(customSection: string): Filter {
  let section;
  return (action) => (!(section = toSection(action)) || customSection === section);
}

export function toSection(action: IEffectsAction): string {
  return (action.data && action.data.section) || (action.initialData && action.initialData.section);
}
