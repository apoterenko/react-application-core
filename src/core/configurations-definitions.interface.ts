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
  IActionIconWrapper,
  IActionTextWrapper,
  IAlwaysDirtyWrapper,
  IClassNameWrapper,
  IDisabledWrapper,
  INotUseActionsWrapper,
  INotUseClassNameWrapper,
  IReadOnlyWrapper,
  IResetTextWrapper,
  IUseResetButtonWrapper,
  ISubmittableWrapper,
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

/* @stable - 31.03.2018 */
export interface IFormConfiguration extends INotUseClassNameWrapper,
                                            INotUseActionsWrapper,
                                            IUseResetButtonWrapper,
                                            IClassNameWrapper,
                                            ISubmittableWrapper,
                                            IAlwaysDirtyWrapper,
                                            IDisabledWrapper,
                                            IReadOnlyWrapper,
                                            IActionTextWrapper,
                                            IResetTextWrapper,
                                            IActionIconWrapper {
}

/* @stable - 31.03.2018 */
export interface IFormConfigurationWrapper {
  formConfiguration?: IFormConfiguration;
}
