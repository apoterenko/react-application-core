import { IBaseContainerInternalProps } from '../../../component/base';
import { IApplicationFilterState } from '../../../component/filter';
import { IHeaderProps } from '../../../component/header';

export interface IHeaderOptions extends IHeaderProps {
  items?: JSX.Element;
}

export interface IDefaultLayoutContainerInternalProps extends IBaseContainerInternalProps {
  bodyClassName?: string;
  footer?: JSX.Element;
  filter?: IApplicationFilterState;
  headerOptions?: IHeaderOptions;
}
