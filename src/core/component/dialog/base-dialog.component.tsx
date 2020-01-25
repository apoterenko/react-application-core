import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as R from 'ramda';

import { Button } from '../button';
import {
  calc,
  handlerPropsFactory,
  isCheckScrimNeeded,
  isDefault,
  isFn,
  isScrollable,
  joinClassName,
  orNull,
} from '../../util';
import { PerfectScrollPlugin } from '../plugin/perfect-scroll.plugin';
import {
  EventsEnum,
  IActivateDialogConfigEntity,
  IBaseEvent,
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

  private static readonly DIALOG_CLASS_NAME = 'rac-dialog';
  private static readonly DIALOG_SCRIM_CLASS_NAME = 'rac-dialog__scrim';
  private static readonly DIALOG_SCRIM_SELECTOR = `.${BaseDialog.DIALOG_SCRIM_CLASS_NAME}`;
  private static readonly DIALOG_SELECTOR = `.${BaseDialog.DIALOG_CLASS_NAME}`;

  private onDeactivateCallback: () => void;
  private closeEventUnsubscriber: () => void;
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
    this.onDocumentClickCapture = this.onDocumentClickCapture.bind(this);

    this.state = {opened: false} as TState;

    if (isCheckScrimNeeded(props as ICheckScrimWrapper)) {
      this.doesAnotherScrimLayerExist = this.domAccessor.hasElements(BaseDialog.DIALOG_SCRIM_SELECTOR, this.portalElement);
    }
  }

  /**
   * @stable [25.01.2020]
   * @returns {React.ReactNode}
   */
  public render(): React.ReactNode {
    return orNull(
      this.state.opened,
      () => {
        const isAnchored = this.isAnchored;
        return ReactDOM.createPortal(
          <div
            ref={this.selfRef}
            className={
              joinClassName(
                this.dialogClassName,
                !isAnchored && 'rac-absolute rac-full-size',
                isAnchored || this.doesAnotherScrimLayerExist
                  ? 'rac-dialog__transparent-scrim'
                  : BaseDialog.DIALOG_SCRIM_CLASS_NAME
              )}
            {...handlerPropsFactory(this.onDialogScrimClick, !isAnchored, false)}
          >
            {this.dialogBodyElement}
          </div>,
          this.portalElement
        );
      }
    );
  }

  /**
   * @stable [25.01.2020]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.unsubscribeEvents();
  }

  /**
   * @stable [24.01.2020]
   * @param {IActivateDialogConfigEntity} payload
   */
  public activate(payload?: IActivateDialogConfigEntity): void {
    const props = this.props;

    this.setState({opened: true}, () => {
      this.onAfterRender();

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
   * @stable [25.01.2020]
   */
  private onDocumentClickCapture(event: IBaseEvent): void {
    const target = event.target;
    if (this.domAccessor.hasParent(BaseDialog.DIALOG_SELECTOR, target as HTMLElement)) {
      return;
    }
    this.doClose();
  }

  /**
   * @stable [25.01.2020]
   */
  private onAfterRender(): void {
    if (!this.isAnchored) {
      return;
    }

    this.unsubscribeEvents();

    const props = this.props;
    this.domAccessor.setPosition({
      ...props.positionConfiguration as {},
      element: this.bodyRef.current,
      of: calc<HTMLElement>(props.anchorElement),
    });

    this.closeEventUnsubscriber = this.domAccessor.captureEvent({
      eventName: EventsEnum.CLICK,
      capture: true, // We must process a capture phase of click event because a component may stop an events bubbling
      callback: this.onDocumentClickCapture,
    });
  }

  /**
   * @stable [05.01.2020]
   * @param {() => void} callback
   */
  private doClose(callback?: () => void): void {
    const props = this.props;

    this.setState({opened: false}, () => {
      this.unsubscribeEvents();

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
        onClick={this.domAccessor.cancelEvent}  // To stop the events bubbling
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
    const {
      children,
      title,
    } = this.props;

    return (
      <React.Fragment>
        {
          title && (
            <div className='rac-dialog__body-title'>
              {this.t(title)}
            </div>
          )
        }
        {
          children && (
            <BasicComponent
              className='rac-dialog__body-content'
              plugins={isScrollable(this.props) ? [PerfectScrollPlugin] : []}>
              {children}
            </BasicComponent>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [25.01.2020]
   */
  private unsubscribeEvents(): void {
    if (isFn(this.closeEventUnsubscriber)) {
      this.closeEventUnsubscriber();
      this.closeEventUnsubscriber = null;
    }
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
    const props = this.props;

    return joinClassName(
      BaseDialog.DIALOG_CLASS_NAME,
      isDefault(props) && 'rac-default-dialog',
      this.isAnchored ? 'rac-anchored-dialog' : 'rac-not-anchored-dialog',
      props.className
    );
  }
}
