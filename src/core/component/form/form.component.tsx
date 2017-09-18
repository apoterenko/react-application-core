import * as React from 'react';
import * as ramda from 'ramda';
import { ILogger, LoggerFactory } from 'ts-smart-logger';

import { cloneNodes } from 'core/util';
import { AnyT, BasicEventT, ReactElementT } from 'core/definition.interface';
import { BaseComponent, IBaseComponent } from 'core/component/base';
import { Button } from 'core/component/button';
import { Field, IField, IFieldInternalProps, IFieldChangeFormInternalProps } from 'core/component/field';

import {
  IFormPureComponent,
  IFormInternalProps,
  INITIAL_APPLICATION_FORM_STATE
} from './form.interface';

export class Form<TComponent extends IBaseComponent<IFormInternalProps, TInternalState>,
                  TInternalState>
    extends BaseComponent<TComponent, IFormInternalProps, TInternalState> {

  public static defaultProps: IFormInternalProps = {
    form: INITIAL_APPLICATION_FORM_STATE,
    settings: {},
  };
  private static logger: ILogger = LoggerFactory.makeLogger(Form);

  private childrenMap: Map<ReactElementT, string> = new Map<ReactElementT, string>();

  constructor(props: IFormInternalProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const { form, settings } = props;
    const className = ['app-form', settings.className];

    return (
        <form ref='self'
              className={className.filter((cls) => !!cls).join(' ')}
              onSubmit={this.onSubmit}>
          <fieldset disabled={form.progress}>
            <section className='mdc-card__primary'>
              {
                cloneNodes<IFieldChangeFormInternalProps>(
                    this,
                    {
                      changeForm: (name: string, value: AnyT, validationGroup?: string) =>
                          this.onChange(name, value, validationGroup),
                    },
                    (child: ReactElementT) => Field.isPrototypeOf(child.type),
                    this.childrenMap,
                )
              }
            </section>
            <section className='mdc-card__actions app-card-actions'>
              <Button type='submit'
                      className='mdc-button--raised'
                      disabled={!form.valid || !form.dirty}
                      progress={form.progress}
                      error={!ramda.isNil(form.error)}>
                {this.t(settings.actionText || 'Save')}
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

  public componentWillUpdate(nextProps: Readonly<IFormInternalProps>, nextState: Readonly<TInternalState>, nextContext: AnyT): void {
    super.componentWillUpdate(nextProps, nextState, nextContext);
    this.childrenMap.clear();

  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.childrenMap.clear();
  }

  private onChange(name: string, value: AnyT, validationGroup: string): void {
    this.resetGroupFieldsErrors(name, validationGroup);
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

  private resetGroupFieldsErrors(name: string, validationGroup: string): void {
    if (!validationGroup) {
      return;
    }
    this.childrenMap.forEach((uuidRef, child) => {
      const childProps = child.props as IFieldInternalProps;
      const groupName = childProps.validationGroup;
      const fieldName = childProps.name;

      if (groupName === validationGroup && fieldName !== name) {
        const otherFieldInstanceAtTheSameGroup = this.refs[uuidRef] as IField<{}, {}, {}>;
        if (otherFieldInstanceAtTheSameGroup) {
          otherFieldInstanceAtTheSameGroup.resetError();
        } else {
          Form.logger.warn(`The ref is not defined to the field with ${fieldName} name.`);
        }
      }
    });
  }
}
