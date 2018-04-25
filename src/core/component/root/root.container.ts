import { Redirect, Route } from 'react-router-dom';
import * as URLSearchParams from 'url-search-params';

import { IKeyValue } from '../../definitions.interface';
import { BaseContainer } from '../../component/base';

import {
  IRootContainerInternalProps,
  ROOT_PATH_UPDATE_ACTION_TYPE,
  ROOT_SECTION,
  IRootUpdatePathPayload,
} from './root.interface';

export class RootContainer extends BaseContainer<IRootContainerInternalProps, {}> {

  public static defaultProps: IRootContainerInternalProps = {
    sectionName: ROOT_SECTION,
  };

  public componentWillMount(): void {
    const props = this.props;
    if (props.beforeEnter) {
      props.beforeEnter();
    }
    const actionParams: IRootUpdatePathPayload = {
      path: props.path,
      section: props.section,
      changes: props.initialChanges && props.initialChanges(this.appStore.getState()),
    };
    this.dispatch(ROOT_PATH_UPDATE_ACTION_TYPE, actionParams);
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
