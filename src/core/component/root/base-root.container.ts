import { Redirect, Route } from 'react-router-dom';

import { IKeyValue } from '../../definitions.interface';
import { BaseContainer } from '../../component/base/base.container';
import {
  ROOT_SECTION,
} from './root.interface';
import {
  getURLSearchParams,
  isFn,
} from '../../util';
import { IBaseRootContainerProps } from '../../definition';

export class BaseRootContainer extends BaseContainer<IBaseRootContainerProps> {

  public static readonly defaultProps: IBaseRootContainerProps = {
    sectionName: ROOT_SECTION,
  };

  /**
   * @stable [16.11.2019]
   * @param {IBaseRootContainerProps} props
   */
  constructor(props: IBaseRootContainerProps) {
    super(props);

    if (isFn(props.beforeEnter)) {
      props.beforeEnter();
    }
  }

  /**
   * @stable [16.11.2019]
   */
  public componentDidMount(): void {
    if (isFn(this.props.afterEnter)) {
      this.props.afterEnter();
    }
  }

  /**
   * @stable [16.11.2019]
   * @returns {IKeyValue}
   */
  protected get routeParams(): IKeyValue {
    return this.props.computedMatch.params;
  }

  /**
   * @stable [16.11.2019]
   * @returns {URLSearchParams}
   */
  protected get queryParams(): URLSearchParams {
    return getURLSearchParams(this.props.location.search);
  }
}
