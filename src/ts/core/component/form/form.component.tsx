import * as React from 'react';
import * as ramda from 'ramda';

import { AnyT, BasicEventT } from 'core/definition.interface';
import { BaseComponent, IBaseComponent } from 'core/component/base';
import { Field } from 'core/component/field';
import { Button } from 'core/component/button';

import {
  IFormPureComponent,
  IFormInternalProps,
} from './form.interface';

export class Form<TComponent extends IBaseComponent<IFormInternalProps, TInternalState>,
                  TInternalState>
    extends BaseComponent<TComponent, IFormInternalProps, TInternalState> {

  constructor(props: IFormInternalProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const className = ['app-form', props.className];

    return (
        <form ref='self'
              className={className.filter((cls) => !!cls).join(' ')}
              onSubmit={this.onSubmit}>
          <fieldset disabled={props.progress}>
            <section className='mdc-card__primary'>
              {
                React.Children.map(this.props.children,
                  (child: React.ReactElement<{}>) => {
                    return Field.isPrototypeOf(child.type)
                        ? React.cloneElement<{}, {}>(child, {
                          changeForm: (name: string, value: string) => this.onChange(name, value),
                        })
                        : child;
                  },
                )
              }
            </section>
            <section className='mdc-card__actions app-card-actions'>
              <Button className='mdc-button--raised'
                      text={props.actionText || 'Save'}
                      disabled={!props.valid || (props.validationErrors || []).length > 0 || !props.dirty}
                      progress={props.progress}
                      error={!ramda.isNil(props.error)}/>
            </section>
          </fieldset>
        </form>
    );
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.propsOnValid();
  }

  private onChange(name: string, value: AnyT): void {
    if (this.props.onChange) {
      this.props.onChange(name, value);
    }
    this.propsOnValid();
  }

  private propsOnValid(): void {
    if (this.props.onValid) {
      this.props.onValid((this.refs.self as IFormPureComponent).checkValidity());
    }
  }

  private onSubmit(event: BasicEventT): void {
    this.stopEvent(event);

    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }
}
