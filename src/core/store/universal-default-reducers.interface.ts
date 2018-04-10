import { Reducer } from 'redux';

import { ITransportWrapper } from '../definitions.interface';
import { transportReducer } from '../transport/transport.reducer';

/* @stable - 10.04.2018 */
export interface IUniversalDefaultReducersDefinition<TTransport> extends ITransportWrapper<TTransport> {
}

/* @stable - 10.04.2018 */
export interface IUniversalDefaultReducersMap extends IUniversalDefaultReducersDefinition<Reducer<{}>> {
}

/* @stable - 10.04.2018 */
export const universalDefaultReducers: IUniversalDefaultReducersMap = {
  transport: transportReducer,
};
