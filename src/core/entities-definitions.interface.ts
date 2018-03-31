import {
  IPageSizeWrapper,
  IPageWrapper,
  ITotalAmountWrapper,
  ITotalCountWrapper,
  IEntitiesDataWrapper,
  IAnyDataWrapper,
  IIpWrapper,
  IMessagesWrapper,
  INameWrapper,
  IStringChannelWrapper,
  IChannelWrapper,
} from './definition.interface';

/* @stable - 31.03.2018 */
export interface IPaginatedEntity extends IPageWrapper,
                                          IPageSizeWrapper,
                                          ITotalCountWrapper,
                                          ITotalAmountWrapper {
}

/* @stable - 31.03.2018 */
export interface IPaginatedEntitiesEntity extends IPaginatedEntity,
                                                  IEntitiesDataWrapper {
}

/* @stable - 31.03.2018 */
export interface IChannelMessageEntity extends IIpWrapper,
                                               INameWrapper,
                                               IStringChannelWrapper,
                                               IAnyDataWrapper {
}

/* @stable - 31.03.2018 */
export interface IChannelMessagesWrapperEntity extends IMessagesWrapper<IChannelMessageEntity[]> {
}

/* @stable - 31.03.2018 */
export interface IChannelWrapperEntity extends IChannelWrapper<IChannelMessagesWrapperEntity> {
}
