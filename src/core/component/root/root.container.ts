import { Redirect, Route } from 'react-router-dom';
import * as URLSearchParams from 'url-search-params';

import { IKeyValue } from '../../definitions.interface';
import { BaseContainer } from '../../component/base';

import {
  IRootContainerProps,
  ROOT_SECTION,
} from './root.interface';

export class RootContainer extends BaseContainer<IRootContainerProps> {

  public static defaultProps: IRootContainerProps = {
    sectionName: ROOT_SECTION,
  };

  constructor(props: IRootContainerProps) {
    super(props);
    if (props.beforeEnter) {
      props.beforeEnter();
    }
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
}
