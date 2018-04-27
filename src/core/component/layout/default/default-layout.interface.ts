import { IHeaderProps } from '../../../component/header';
import { IQueryFilterEntity, IContainerEntity } from '../../../entities-definitions.interface';
import { IContainerConfiguration } from '../../../configurations-definitions.interface';

export interface IHeaderOptions extends IHeaderProps {
  items?: JSX.Element;
}

export interface IDefaultLayoutContainerInternalProps extends IContainerEntity,
                                                              IContainerConfiguration {
  bodyClassName?: string;
  footer?: JSX.Element;
  filter?: IQueryFilterEntity;
  headerOptions?: IHeaderOptions;
}
