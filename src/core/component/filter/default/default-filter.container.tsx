import * as React from 'react';

import { BaseContainer } from '../../base';
import { DefaultLayoutContainer } from '../../layout';
import { FormContainer, IFormContainerProps } from '../../form';

export class DefaultFilterContainer<TProps extends IFormContainerProps>
  extends BaseContainer<TProps> {

  public render(): JSX.Element {
    const props = this.props;

    return (
      <DefaultLayoutContainer headerConfiguration={{
                                navigationActionType: 'arrow_left',
                                onNavigationActionClick: this.navigateToBack,
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
