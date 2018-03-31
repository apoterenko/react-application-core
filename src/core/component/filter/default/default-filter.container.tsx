import * as React from 'react';

import { BaseContainer } from '../../base';
import { DefaultLayoutContainer } from '../../layout';
import { FormContainer } from '../../form';
import { IDefaultFilterContainerInternalProps, IDefaultFilterContainerInternalState } from './default-filter.interface';

export class DefaultFilterContainer<TInternalProps extends IDefaultFilterContainerInternalProps,
                                    TInternalState extends IDefaultFilterContainerInternalState>
  extends BaseContainer<TInternalProps, TInternalState> {

  public render(): JSX.Element {
    const props = this.props;

    return (
      <DefaultLayoutContainer headerOptions={{
                                navigationActionType: 'arrow_back',
                                navigationActionHandler: this.navigateToBack,
                              }}
                              title={this.t('Filter')}
                              {...props}>
        <FormContainer formConfiguration={{actionText: this.t('Apply'), actionIcon: 'done', useResetButton: true}}
                       {...props}>
          {props.children}
        </FormContainer>
      </DefaultLayoutContainer>
    );
  }
}
