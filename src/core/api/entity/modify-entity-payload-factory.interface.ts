import { IEffectsAction } from 'redux-effects-promise';

import {
  IChangeable,
  IIdentifiedEntity,
  IKeyValue,
  IPayloadable,
} from '../../definition.interface';

export interface IModifyEntityPayload extends IIdentifiedEntity,
                                              IChangeable<IKeyValue> {
  mergeStrategy?: EntityOnSaveMergeStrategyEnum;
}

export interface IModifyEntityPayloadWrapper extends IPayloadable<IModifyEntityPayload> {
}

export enum EntityOnSaveMergeStrategyEnum {
  OVERRIDE,
  MERGE,
}

export interface IApplicationModifyEntityPayloadFactory {
  makeInstance(action: IEffectsAction): IModifyEntityPayloadWrapper;
}
