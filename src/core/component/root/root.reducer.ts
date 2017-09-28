import { AnyAction } from 'redux';

import { IKeyValue } from '../../definition.interface';

import {
  IApplicationRootState,
  INITIAL_APPLICATION_ROOT_STATE,
  ROOT_PATH_UPDATE_ACTION_TYPE,
  ROOT_SECTION,
} from './root.interface';

export function rootReducer(state: IApplicationRootState = INITIAL_APPLICATION_ROOT_STATE,
                            action: AnyAction): IKeyValue {
  switch (action.type) {
    case `${ROOT_SECTION}.${ROOT_PATH_UPDATE_ACTION_TYPE}`:
      return {
        path: action.data.path,
      };
  }
  return state;
}
