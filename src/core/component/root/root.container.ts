import { Redirect, Route } from 'react-router-dom';
import * as URLSearchParams from 'url-search-params';

import { IKeyValue } from '../../definition.interface';
import { BaseContainer } from '../../component/base';

import {
  IRootContainerInternalProps,
  ROOT_PATH_UPDATE_ACTION_TYPE,
  ROOT_SECTION,
} from './root.interface';

export class RootContainer<TInternalProps extends IRootContainerInternalProps>
    extends BaseContainer<TInternalProps, {}> {

  constructor(props: TInternalProps) {
    super(props, ROOT_SECTION);
  }

  public componentWillMount(): void {
    if (this.props.beforeEnter) {
      this.props.beforeEnter();
    }
    this.dispatch(ROOT_PATH_UPDATE_ACTION_TYPE, { path: this.props.path });
  }

  public componentDidMount(): void {
    if (this.props.afterEnter) {
      this.props.afterEnter();
    }
  }

  protected get routeParams(): IKeyValue {
    return this.props.computedMatch.params;
  }

  protected get queryParams(): URLSearchParams {
    return new URLSearchParams(this.props.location.search);
  }

  protected get isAuthorized(): boolean {
    return this.permissionService.isAuthorized();
  }
}
