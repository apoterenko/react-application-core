import { AnyAction } from 'redux';
import * as R from 'ramda';

import {
  IReplacedWrapper,
  ISelectedWrapper,
  IUpdatedWrapper,
} from '../definitions.interface';
import { IEntityReducerFactoryConfigEntity } from '../definition';
import { NvlUtils } from './nvl';
import { TypeUtils } from './type';
import { CloneUtils } from './clone';

/**
 * @stable [06.04.2020]
 * @param {IEntityReducerFactoryConfigEntity} config
 * @returns {(state: {}, action: AnyAction) => {}}
 */
const makeEntityReducer = (config: IEntityReducerFactoryConfigEntity): (state: {}, action: AnyAction) => {} =>
  (state = config.initialState || null, action): {} => {
    switch (action.type) {
      case config.update:
      case config.replace:
      case config.select:
        const selectedWrapper: ISelectedWrapper<{}> = action.data;
        const updatedWrapper: IUpdatedWrapper<{}> = action.data;
        const replacedWrapper: IReplacedWrapper = action.data;
        const selectedEntity = selectedWrapper.selected;
        const updatedEntity = updatedWrapper.updated;
        const replacedEntity = replacedWrapper.replaced;
        const entity = NvlUtils.coalesce(selectedEntity, updatedEntity, replacedEntity);

        // When selected === null or replaced === null or updated === null
        const defEntity = NvlUtils.coalesceDef(selectedEntity, updatedEntity, replacedEntity);

        return R.isNil(entity)
          ? (TypeUtils.isUndef(defEntity) ? state : defEntity)
          : (
            TypeUtils.isPrimitive(entity)
              ? entity
              : (
                Array.isArray(entity)
                  ? [...entity]
                  : (
                    R.isNil(replacedEntity)
                      ? {...state, ...entity}             // Select or update
                      : CloneUtils.shallowClone(entity)   // Replace
                  )
              )
          );
      case config.destroy:
        return null;
    }
    return state;
  };

/**
 * @stable [23.12.2020]
 */
export class ReducerUtils {
  public static readonly entityReducer = makeEntityReducer;
}
