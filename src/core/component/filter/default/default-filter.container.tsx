import * as React from 'react';

import { BaseContainer } from '../../base';
import { DefaultLayoutContainer } from '../../layout';
import { ROUTER_BACK } from '../../../router';
import { FormContainer } from '../../form';
import { IDefaultFilterContainerInternalProps, IDefaultFilterContainerInternalState } from './default-filter.interface';

export class DefaultFilterContainer<TInternalProps extends IDefaultFilterContainerInternalProps,
                                    TInternalState extends IDefaultFilterContainerInternalState>
  extends BaseContainer<TInternalProps, TInternalState> {

  constructor(props: TInternalProps) {
    super(props);
    this.navigationControlHandler = this.navigationControlHandler.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;

    return (
      <DefaultLayoutContainer headerOptions={{
                                navigationActionType: 'arrow_back',
                                navigationActionHandler: this.navigationControlHandler,
                              }}
                              title={this.t('Filter')}
                              {...props}>
        <FormContainer formOptions={{actionText: this.t('Apply'), actionIcon: 'done', resetButton: true}}
                       {...props}>
          {props.children}
        </FormContainer>
      </DefaultLayoutContainer>
    );
  }

  private navigationControlHandler(): void {
    this.dispatch(ROUTER_BACK);
  }
}
