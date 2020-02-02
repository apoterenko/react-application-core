import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as R from 'ramda';

import { Button } from '../button';
import {
  calc,
  handlerPropsFactory,
  isCheckModalNeeded,
  isDefault,
  isFn,
  isInline,
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
import { ICheckModalWrapper } from '../../definitions.interface';

export class BaseDialog<TProps extends IDialogProps = IDialogProps,
                        TState extends IDialogState = IDialogState>
  extends BaseComponent<TProps, TState>
  implements IDialog<TProps, TState> {

  private static readonly DIALOG_CLASS_NAME = 'rac-dialog';
  private static readonly DIALOG_MODAL_CLASS_NAME = 'rac-modal-dialog';

  private onDeactivateCallback: () => void;
  private closeEventUnsubscriber: () => void;
  private readonly doesAnotherModalDialogOpen: boolean;
  private readonly bodyRef = React.createRef<HTMLDivElement>();

  /**
   * @stable [06.01.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onAcceptClick = this.onAcceptClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onDialogClick = this.onDialogClick.bind(this);
    this.onDocumentClickCapture = this.onDocumentClickCapture.bind(this);

    this.state = {opened: false} as TState;

    if (isCheckModalNeeded(props as ICheckModalWrapper)) {
      this.doesAnotherModalDialogOpen = this.domAccessor.hasElements(BaseDialog.DIALOG_MODAL_CLASS_NAME, this.portalElement);
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
        const inline = this.isInline;
        const modal = this.isModal;

        const content = (
          <div
            ref={this.selfRef}
            className={this.dialogClassName}
            {...handlerPropsFactory(this.onDialogClick, modal, false)}
          >
            {this.dialogBodyElement}
          </div>
        );
        return inline
          ? content
          : ReactDOM.createPortal(content, this.portalElement);
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
   * @stable [30.01.2020]
   * @returns {string}
   */
  protected get title(): string | boolean {
    return this.props.title;
  }

  /**
   * @stable [30.01.2020]
   * @returns {string}
   */
  protected get closeText(): string {
    return this.props.closeText || this.settings.messages.DIALOG_CANCEL;
  }

  /**
   * @stable [30.01.2020]
   * @returns {string}
   */
  protected get acceptText(): string {
    return this.props.acceptText || this.settings.messages.DIALOG_ACCEPT;
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
  private onDialogClick(): void {
    this.doClose();
  }

  /**
   * @stable [29.01.2020]
   */
  private onDocumentClickCapture(event: IBaseEvent): void {
    const element = event.target as HTMLElement;

    if (this.domAccessor.getParentsAsElements({parentClassName: BaseDialog.DIALOG_CLASS_NAME, element})
        .includes(this.getSelf())) {
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
                    {this.t(this.closeText)}
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
                    {this.t(this.acceptText)}
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
    const {children} = this.props;
    const title = this.title;

    return (
      <React.Fragment>
        {
          title && (
            <div className='rac-dialog__body-title'>
              {this.t(title as string)}
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
   * @stable [31.01.2020]
   * @returns {boolean}
   */
  private get isInline(): boolean {
    return isInline(this.props);
  }

  /**
   * @stable [31.01.2020]
   * @returns {boolean}
   */
  private get isDefault(): boolean {
    return isDefault(this.props);
  }

  /**
   * @stable [31.01.2020]
   * @returns {boolean}
   */
  private get isModal(): boolean {
    return !this.isInline && !this.isAnchored;
  }

  /**
   * @stable [31.01.2020]
   * @returns {string}
   */
  private get dialogClassName(): string {
    const props = this.props;

    return joinClassName(
      calc<string>(props.className),
      BaseDialog.DIALOG_CLASS_NAME,
      this.isDefault && 'rac-default-dialog',
      this.isModal && BaseDialog.DIALOG_MODAL_CLASS_NAME,
      this.isAnchored ? 'rac-anchored-dialog' : 'rac-not-anchored-dialog',
      this.isInline
        ? 'rac-inline-dialog'
        : (
          !this.isAnchored && (
            this.doesAnotherModalDialogOpen ? 'rac-transparent-dialog' : 'rac-not-transparent-dialog'
          )
        ),
    );
  }
}
