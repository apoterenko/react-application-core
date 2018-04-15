import { AnyAction } from 'redux';

import { IKeyValue } from '../../definitions.interface';
import { ILayoutEntity } from '../../entities-definitions.interface';
import {
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
  INITIAL_APPLICATION_LAYOUT_STATE,
} from './layout.interface';

export function layoutReducer(state: ILayoutEntity = INITIAL_APPLICATION_LAYOUT_STATE,
                              action: AnyAction): IKeyValue {
  switch (action.type) {
    case LAYOUT_MODE_UPDATE_ACTION_TYPE:
      return {
        mode: action.data.mode,
      };
  }
  return state;
}
