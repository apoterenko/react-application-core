import { IBaseContainerInternalProps } from '../../../component/base';
import { IHeaderProps } from '../../../component/header';
import { IQueryFilterEntity } from '../../../entities-definitions.interface';

export interface IHeaderOptions extends IHeaderProps {
  items?: JSX.Element;
}

export interface IDefaultLayoutContainerInternalProps extends IBaseContainerInternalProps {
  bodyClassName?: string;
  footer?: JSX.Element;
  filter?: IQueryFilterEntity;
  headerOptions?: IHeaderOptions;
}
