import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as R from 'ramda';

import { Button } from '../button';
import {
  calc,
  handlerPropsFactory,
  isCheckScrimNeeded,
  isFn,
  joinClassName,
  noop,
  orNull,
} from '../../util';
import { PerfectScrollPlugin } from '../plugin';
import {
  IActivateDialogConfigEntity,
  IDialog,
  IDialogProps,
  IDialogState,
} from '../../definition';
import { BasicComponent } from '../base/basic.component';
import { BaseComponent } from '../base/base.component';
import { ICheckScrimWrapper } from '../../definitions.interface';

export class BaseDialog<TProps extends IDialogProps = IDialogProps,
                        TState extends IDialogState = IDialogState>
  extends BaseComponent<TProps, TState>
  implements IDialog<TProps, TState> {

  private onDeactivateCallback: () => void;
  private readonly doesAnotherScrimLayerExist: boolean;
  private readonly bodyRef = React.createRef<HTMLDivElement>();

  /**
   * @stable [06.01.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onAcceptClick = this.onAcceptClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onDialogScrimClick = this.onDialogScrimClick.bind(this);

    this.state = {opened: false} as TState;

    if (isCheckScrimNeeded(props as ICheckScrimWrapper)) {
      this.doesAnotherScrimLayerExist = this.domAccessor.hasElements('.rac-dialog__scrim', this.portalElement);
    }
  }

  /**
   * @stable [05.01.2020]
   * @returns {React.ReactNode}
   */
  public render(): React.ReactNode {
    return orNull(
      this.state.opened,
      () => (
        ReactDOM.createPortal(
          <div
            ref={this.selfRef}
            className={this.dialogClassName}
          >
            <div
              className={
                joinClassName(
                  'rac-dialog__body-wrapper',
                  'rac-absolute',
                  'rac-full-size',
                  this.isAnchored || this.doesAnotherScrimLayerExist ? 'rac-dialog__transparent-scrim' : 'rac-dialog__scrim'
                )}
              {...handlerPropsFactory(this.onDialogScrimClick, true, false)}
            >
              {this.dialogBodyElement}
            </div>
          </div>,
          this.portalElement
        )
      )
    );
  }

  /**
   * @stable [24.01.2020]
   * @param {IActivateDialogConfigEntity} payload
   */
  public activate(payload?: IActivateDialogConfigEntity): void {
    const props = this.props;

    this.setState({opened: true}, () => {
      if (this.isAnchored) {
        this.domAccessor.setPosition({
          ...props.positionConfiguration as {},
          element: this.bodyRef.current,
          of: calc<HTMLElement>(props.anchorElement),
        });
      }

      const {
        onActivate,
        onDeactivate,
      } = payload || {} as IActivateDialogConfigEntity;

      if (isFn(onDeactivate)) {
        this.onDeactivateCallback = onDeactivate;
      }
      if (isFn(onActivate)) {
        onActivate.call(this);
      }
      if (isFn(props.onActivate)) {
        props.onActivate();
      }
    });
  }

  /**
   * @stable [06.01.2020]
   */
  public accept(): void {
    this.onAcceptClick();
  }

  /**
   * @stable [06.01.2020]
   */
  protected onAcceptClick(): void {
    const props = this.props;

    this.doClose(() => {
      if (isFn(props.onAccept)) {
        props.onAccept();
      }
    });
  }

  /**
   * @stable [05.01.2020]
   */
  private onCloseClick(): void {
    const props = this.props;

    this.doClose(() => {
      if (isFn(props.onClose)) {
        props.onClose();
      }
    });
  }

  /**
   * @stable [05.01.2020]
   */
  private onDialogScrimClick(): void {
    this.doClose();
  }

  /**
   * @stable [05.01.2020]
   * @param {() => void} callback
   */
  private doClose(callback?: () => void): void {
    const props = this.props;

    this.setState({opened: false}, () => {
      if (isFn(this.onDeactivateCallback)) {
        this.onDeactivateCallback.call(this);
        this.onDeactivateCallback = null;
      }
      if (isFn(props.onDeactivate)) {
        props.onDeactivate();
      }
      if (isFn(callback)) {
        callback.call(this);
      }
    });
  }

  /**
   * @stable [24.03.2019]
   * @returns {JSX.Element}
   */
  private get footerElement(): JSX.Element {
    const props = this.props;
    return (
      orNull(
        this.closable || this.acceptable,
        () => (
          <div className='rac-dialog__actions'>
            {
              orNull(
                this.closable,
                () => (
                  <Button
                    icon='close'
                    full={true}
                    disabled={this.isCloseButtonDisabled}
                    onClick={this.onCloseClick}>
                    {this.t(props.closeText || this.settings.messages.DIALOG_CANCEL)}
                  </Button>
                )
              )
            }
            {
              orNull(
                this.acceptable,
                () => (
                  <Button
                    icon='ok-filled'
                    full={true}
                    raised={true}
                    disabled={this.isAcceptButtonDisabled}
                    onClick={this.onAcceptClick}>
                    {this.t(props.acceptText || this.settings.messages.DIALOG_ACCEPT)}
                  </Button>
                )
              )
            }
          </div>
        )
      )
    );
  }

  /**
   * @stable [24.01.2020]
   * @returns {JSX.Element}
   */
  private get dialogBodyElement(): JSX.Element {
    return (
      <div
        ref={this.bodyRef}
        style={{width: calc<number>(this.props.width)}}
        className='rac-dialog__body'
        {...handlerPropsFactory(noop, true, false)}  // To stop the events bubbling
      >
        {this.bodyElement}
        {this.footerElement}
      </div>
    );
  }

  /**
   * @stable [06.01.2020]
   * @returns {JSX.Element}
   */
  private get bodyElement(): JSX.Element {
    const props = this.props;
    return (
      <React.Fragment>
        {
          props.title && (
            <div className='rac-dialog__body-title'>
              {this.t(props.title)}
            </div>
          )
        }
        {
          props.children && (
            <BasicComponent
              className='rac-dialog__body-content'
              plugins={PerfectScrollPlugin}>
              {props.children}
            </BasicComponent>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [06.01.2020]
   * @returns {boolean}
   */
  private get acceptable(): boolean {
    return this.props.acceptable !== false;
  }

  /**
   * @stable [06.01.2020]
   * @returns {boolean}
   */
  private get closable(): boolean {
    return this.props.closable !== false;
  }

  /**
   * @stable [06.01.2020]
   * @returns {boolean}
   */
  private get isCloseButtonDisabled(): boolean {
    return this.props.closeDisabled === true;
  }

  /**
   * @stable [06.01.2020]
   * @returns {boolean}
   */
  private get isAcceptButtonDisabled(): boolean {
    return this.props.acceptDisabled === true;
  }

  /**
   * @stable [15.01.2020]
   * @returns {Element}
   */
  private get portalElement(): Element {
    return this.domAccessor.documentBody;
  }

  /**
   * @stable [24.01.2020]
   * @returns {boolean}
   */
  private get isAnchored(): boolean {
    return !R.isNil(this.props.anchorElement);
  }

  /**
   * @stable [05.01.2020]
   * @returns {string}
   */
  private get dialogClassName(): string {
    return joinClassName(
      'rac-dialog',
      this.isAnchored ? 'rac-anchored-dialog' : 'rac-not-anchored-dialog',
      this.props.className
    );
  }
}
