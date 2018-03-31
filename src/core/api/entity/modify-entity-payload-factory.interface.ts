import { IEffectsAction } from 'redux-effects-promise';

import {
  IEntityIdTWrapper,
  IKeyValueChangesWrapper,
  IPayloadWrapper,
} from '../../definition.interface';

export interface IModifyEntityPayload extends IEntityIdTWrapper,
                                              IKeyValueChangesWrapper {
  mergeStrategy?: EntityOnSaveMergeStrategyEnum;
}

export interface IModifyEntityPayloadWrapper extends IPayloadWrapper<IModifyEntityPayload> {
}

export enum EntityOnSaveMergeStrategyEnum {
  OVERRIDE,
  MERGE,
}

export interface IApplicationModifyEntityPayloadFactory {
  makeInstance(action: IEffectsAction): IModifyEntityPayloadWrapper;
}
