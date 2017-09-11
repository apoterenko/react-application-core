import * as React from 'react';
import * as ramda from 'ramda';

import { cloneNodes } from 'core/util';
import { AnyT, BasicEventT, ReactElementT } from 'core/definition.interface';
import { BaseComponent, IBaseComponent } from 'core/component/base';
import { Button } from 'core/component/button';
import { Field } from 'core/component/field';

import { IFormPureComponent, IFormInternalProps } from './form.interface';

export class Form<TComponent extends IBaseComponent<IFormInternalProps, TInternalState>,
                  TInternalState>
    extends BaseComponent<TComponent, IFormInternalProps, TInternalState> {

  constructor(props: IFormInternalProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const { attributes, settings }  = props;
    const className = ['app-form', settings && settings.className];

    return (
        <form ref='self'
              className={className.filter((cls) => !!cls).join(' ')}
              onSubmit={this.onSubmit}>
          <fieldset disabled={attributes.progress}>
            <section className='mdc-card__primary'>
              {
                cloneNodes(
                    this,
                    {changeForm: (name: string, value: string) => this.onChange(name, value)},
                    (child: ReactElementT) => Field.isPrototypeOf(child.type),
                )
              }
            </section>
            <section className='mdc-card__actions app-card-actions'>
              <Button type='submit'
                      className='mdc-button--raised'
                      disabled={!attributes.valid || (attributes.validationErrors || []).length > 0 || !attributes.dirty}
                      progress={attributes.progress}
                      error={!ramda.isNil(attributes.error)}>
                {this.t(settings ? settings.actionText : 'Save')}
              </Button>
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
