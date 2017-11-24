import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { cloneNodes, isUndef, orNull, toClassName } from '../../util';
import { AnyT, BasicEventT, ReactElementT } from '../../definition.interface';
import { BaseComponent, IBaseComponent } from '../../component/base';
import { Button } from '../../component/button';
import {
  Field,
  IFieldInternalProps,
  FieldT,
} from '../../component/field';

import {
  IFormPureComponent,
  FormInternalPropsT,
  INITIAL_APPLICATION_FORM_STATE
} from './form.interface';

export class Form<TComponent extends IBaseComponent<FormInternalPropsT, {}>>
    extends BaseComponent<TComponent, FormInternalPropsT, {}> {

  public static defaultProps: FormInternalPropsT = {
    form: INITIAL_APPLICATION_FORM_STATE,
    formOptions: {},
  };
  private static logger = LoggerFactory.makeLogger(Form);

  private childrenMap: Map<ReactElementT, string> = new Map<ReactElementT, string>();

  constructor(props: FormInternalPropsT) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const { form, formOptions } = props;

    return (
        <form ref='self'
              autoComplete='off'
              onReset={this.onReset}
              onSubmit={this.onSubmit}
              className={toClassName('app-form app-column-flex app-full-layout', formOptions.className)}>
          <fieldset disabled={form.progress}
                    className='app-form-body app-row-layout app-full-layout'>
            <section className='mdc-card__primary'>
              {
                cloneNodes<IFieldInternalProps>(
                    this,
                    {
                      phantom: this.isPhantom,
                      changeForm: (name: string, value: AnyT, validationGroup?: string) =>
                          this.onChange(name, value, validationGroup),
                    },
                    (child) => Field.isPrototypeOf(child.type),
                    this.childrenMap,
                    (child) => (child.props as IFieldInternalProps).renderCondition,
                )
              }
            </section>
          </fieldset>
          <section className='app-form-actions mdc-card__actions'>
            {orNull(
                formOptions.resetButton,
                <Button type='reset'
                        icon='clear_all'
                        isRaised={true}
                        disabled={!form.dirty}
                        className='app-form-reset-action'>
                  {this.t(formOptions.resetText || 'Reset')}
                </Button>
            )}
            <Button type='submit'
                    icon={this.isFormValid || this.isPhantom
                        ? (formOptions.actionIcon || 'save')
                        : 'error_outline'}
                    isAccent={true}
                    isRaised={true}
                    disabled={!this.canSubmit}
                    progress={form.progress}
                    error={!R.isNil(form.error)}>
              {this.t(formOptions.actionText || 'Save')}
            </Button>
          </section>
        </form>
    );
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.propsOnValid();
  }

  public componentWillUpdate(nextProps: Readonly<FormInternalPropsT>, nextState: Readonly<{}>, nextContext: {}): void {
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

  private onReset(event: BasicEventT): void {
    this.stopEvent(event);

    if (this.props.onReset) {
      this.props.onReset();
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
        const otherFieldInstanceAtTheSameGroup = this.refs[uuidRef] as FieldT;
        if (otherFieldInstanceAtTheSameGroup) {
          otherFieldInstanceAtTheSameGroup.resetError();
        } else {
          Form.logger.warn(`[$Form] The ref is not defined to the field with ${fieldName} name.`);
        }
      }
    });
  }

  private get isPhantom(): boolean {
    const props = this.props;
    return !props.entity || R.isNil(props.entity.id);
  }

  private get isFormValid(): boolean {
    const form = this.props.form;
    return R.isNil(form.valid) || form.valid;
  }

  private get isFormDirty(): boolean {
    const form = this.props.form;
    return !R.isNil(form.dirty) && form.dirty;
  }

  private get canSubmit(): boolean {
    const form = this.props.form;
    return this.isFormValid && this.isFormDirty && (isUndef(form.saveable) || form.saveable);
  }
}
