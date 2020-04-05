import * as React from 'react';
import * as R from 'ramda';

import {
  isFn,
  joinClassName,
} from '../../util';
import { Button } from '../button';
import { FlexLayout } from '../layout/flex';
import { GenericComponent } from '../base/generic.component';
import { ISubHeaderConfiguration } from '../../configurations-definitions.interface';
import { SubHeaderClassesEnum } from '../../definition';

export class SubHeader extends GenericComponent<ISubHeaderConfiguration> {

  /**
   * @stable [08.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const headerTitle = (
      <span className={SubHeaderClassesEnum.SECTION_TITLE}>{props.title}</span>
    );

    return (
      <FlexLayout row={true}
                  full={false}
                  alignItemsCenter={true}
                  className={joinClassName(
                    'rac-sub-header',
                    props.subBorder && 'rac-sub-header-bordered',
                    !R.isNil(props.navigationActionType) && 'rac-sub-header-navigated'
                  )}>
        {props.navigationActionType && (
          <Button
            icon={props.navigationActionType}
            onClick={props.onNavigationActionClick}
            className='rac-button-navigation'/>
        )}
        {
          isFn(props.titleRenderer)
            ? props.titleRenderer(headerTitle)
            : headerTitle
        }
        {props.items}
      </FlexLayout>
    );
  }
}
