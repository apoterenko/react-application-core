import { Reducer } from 'redux';

import {
  ITransportWrapper,
  IApplicationWrapper,
} from '../definitions.interface';
import { transportReducer } from '../transport/transport.reducer';
import { applicationReducer } from '../component/application/application.reducer';

/* @stable [24.04.2018] */
export interface IUniversalReducersDefinition<TTransport,
                                              TApplication>
  extends ITransportWrapper<TTransport>,
          IApplicationWrapper<TApplication> {
}

/* @stable [24.04.2018] */
export const universalReducers: IUniversalReducersDefinition<Reducer<{}>,
                                                             Reducer<{}>> = {
  transport: transportReducer,
  application: applicationReducer,
};
