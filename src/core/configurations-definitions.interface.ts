import {
  IEntitySorterWrapper,
  INonInteractiveWrapper,
  ISimpleWrapper,
  IStringEmptyMessageWrapper,
  IUseAvatarWrapper,
  IUseTwoLineWrapper,
  IUseAddActionWrapper,
  IEntityRendererWrapper,
  IEntityToClassNameWrapper,
  IEntityTplWrapper,
  IStringIconWrapper,
  IItemConfigurationWrapper,
} from './definition.interface';

/* @stable - 31.03.2018 */
export interface IListItemConfiguration extends IEntityRendererWrapper,
                                                IEntityTplWrapper,
                                                IEntityToClassNameWrapper,
                                                IStringIconWrapper {
}

/* @stable - 31.03.2018 */
export interface IListConfiguration extends ISimpleWrapper,
                                            IUseAddActionWrapper,
                                            IUseTwoLineWrapper,
                                            IUseAvatarWrapper,
                                            IEntitySorterWrapper,
                                            INonInteractiveWrapper,
                                            IStringEmptyMessageWrapper,
                                            IItemConfigurationWrapper<IListItemConfiguration> {
}

/* @stable - 31.03.2018 */
export interface IListConfigurationWrapper {
  listConfiguration: IListConfiguration;
}
