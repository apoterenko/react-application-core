import { IEffectsAction } from 'redux-effects-promise';

import { IPayloadWrapper } from '../../definitions.interface';
import { ToolbarActionEnum } from '../../configurations-definitions.interface';

/**
 * @stable [13.09.2018]
 * @param {IEffectsAction} action
 * @returns {boolean}
 */
export const isToolbarDownloadDataAction = (action: IEffectsAction): boolean => {
  const payloadWrapper: IPayloadWrapper<ToolbarActionEnum> = action.data;
  return payloadWrapper.payload === ToolbarActionEnum.DOWNLOAD_DATA;
};
