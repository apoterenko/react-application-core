import { IEffectsAction } from 'redux-effects-promise';

import {
  IEntityIdTWrapper,
  IChangesWrapper,
  IPayloadWrapper,
} from '../../definitions.interface';

export interface IModifyEntityPayload extends IEntityIdTWrapper,
                                              IChangesWrapper {
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
