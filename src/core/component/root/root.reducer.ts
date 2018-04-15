import { AnyAction } from 'redux';

import {
  INITIAL_APPLICATION_ROOT_STATE,
} from './root.interface';
import { RootActionBuilder } from './root-action.builder';
import { IRootEntity } from '../../entities-definitions.interface';

export function rootReducer(state: IRootEntity = INITIAL_APPLICATION_ROOT_STATE,
                            action: AnyAction): IRootEntity {
  switch (action.type) {
    case RootActionBuilder.buildPathUpdateActionType():
      return {
        ...state,
        path: action.data.path,
      };
  }
  return state;
}
