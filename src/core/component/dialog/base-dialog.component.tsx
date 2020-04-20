import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as R from 'ramda';

import { Button } from '../button';
import {
  calc,
  handlerPropsFactory,
  isCheckModalNeeded,
  isConfirm,
  isDefault,
  isFn,
  isInline,
  isScrollable,
  joinClassName,
  orNull,
} from '../../util';
import { PerfectScrollPlugin } from '../plugin/perfect-scroll.plugin';
import {
  DialogClassesEnum,
  EventsEnum,
  GenericPluginCtorT,
  IActivateDialogConfigEntity,
  IBaseEvent,
  IconsEnum,
  IDialog,
  IDialogProps,
  IDialogState,
} from '../../definition';
import { BasicComponent } from '../base/basic.component';
import { GenericComponent } from '../base/generic.component';

export class BaseDialog<TProps extends IDialogProps = IDialogProps,
                        TState extends IDialogState = IDialogState>
  extends GenericComponent<TProps, TState>
  implements IDialog<TProps, TState> {

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

    if (isCheckModalNeeded(props)) {
      this.doesAnotherModalDialogOpen = this.domAccessor.hasElements(DialogClassesEnum.MODAL_DIALOG, this.portalElement);
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
   * @stable [05.04.2020]
   */
  public componentWillUnmount(): void {
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

  public close(): void {
    this.doClose();
  }

  /**
   * @stable [06.01.2020]
   */
  protected onAcceptClick(): void {
    const props = this.props;

    if (props.onBeforeAccept) {
      props.onBeforeAccept();
    }

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

    if (this.domAccessor.getParentsAsElements({parentClassName: DialogClassesEnum.DIALOG, element})
        .includes(this.selfRef.current)) {
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
  private get actionsElement(): JSX.Element {
    return (
      orNull(
        this.closable || this.acceptable,
        () => (
          <div className={DialogClassesEnum.DIALOG_ACTIONS}>
            {
              orNull(
                this.closable,
                () => (
                  <Button
                    icon={IconsEnum.TIMES}
                    full={true}
                    {...this.props.closeActionConfiguration}
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
                    {...this.props.acceptActionConfiguration}
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
   * @stable [16.03.2020]
   * @returns {JSX.Element}
   */
  private get dialogBodyElement(): JSX.Element {
    return (
      <div
        ref={this.bodyRef}
        style={{width: calc<number>(this.props.width)}}
        className={DialogClassesEnum.DIALOG_BODY}
        onClick={this.domAccessor.cancelEvent}  // To stop the events bubbling
      >
        {this.titleElement}
        {
          this.hasExtraActions
            ? (
              <div className={DialogClassesEnum.DIALOG_BODY_CONTENT_WRAPPER}>
                {this.bodyElement}
                {this.extraActionsElement}
              </div>
            )
            : (
              <BasicComponent
                className={DialogClassesEnum.DIALOG_BODY_CONTENT_WRAPPER}
                plugins={this.wrapperPlugins}
              >
                {this.bodyElement}
                {this.extraActionsElement}
              </BasicComponent>
            )
        }
        {this.actionsElement}
      </div>
    );
  }

  /**
   * @stable [15.03.2020]
   * @returns {JSX.Element}
   */
  private get titleElement(): JSX.Element {
    const title = this.title;
    return (
      <React.Fragment>
        {
          title && (
            <div className={DialogClassesEnum.DIALOG_BODY_TITLE}>
              {this.t(title as string)}
            </div>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [15.03.2020]
   * @returns {JSX.Element}
   */
  private get extraActionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {
          this.hasExtraActions && (
            <div className={DialogClassesEnum.DIALOG_EXTRA_ACTIONS}>
              {this.props.extraActions}
            </div>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [06.01.2020]
   * @returns {JSX.Element}
   */
  private get bodyElement(): JSX.Element {
    const {children} = this.props;

    return (
      <React.Fragment>
        {
          this.hasExtraActions
            ? (
              children && (
                <BasicComponent
                  className={DialogClassesEnum.DIALOG_BODY_CONTENT}
                  plugins={this.wrapperPlugins}
                >
                  {children}
                </BasicComponent>
              )
            )
            : children
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
   * @stable [11.03.2020]
   * @returns {boolean}
   */
  private get isConfirm(): boolean {
    return isConfirm(this.props);
  }

  /**
   * @stable [31.01.2020]
   * @returns {boolean}
   */
  private get isModal(): boolean {
    return !this.isInline && !this.isAnchored;
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get hasExtraActions(): boolean {
    return !R.isNil(this.props.extraActions);
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get isScrollable(): boolean {
    return isScrollable(this.props);
  }

  /**
   * @stable [16.03.2020]
   * @returns {GenericPluginCtorT[]}
   */
  private get wrapperPlugins(): GenericPluginCtorT[] {
    return this.isScrollable ? [PerfectScrollPlugin] : [];
  }

  /**
   * @stable [31.01.2020]
   * @returns {string}
   */
  private get dialogClassName(): string {
    const props = this.props;

    return joinClassName(
      calc<string>(props.className),
      DialogClassesEnum.DIALOG,
      this.isDefault && 'rac-default-dialog',
      this.isModal && DialogClassesEnum.MODAL_DIALOG,
      this.isConfirm && DialogClassesEnum.CONFIRM_DIALOG,
      this.isAnchored ? 'rac-anchored-dialog' : 'rac-not-anchored-dialog',
      this.isInline
        ? DialogClassesEnum.INLINE_DIALOG
        : (
          !this.isAnchored && (
            this.doesAnotherModalDialogOpen ? 'rac-transparent-dialog' : 'rac-not-transparent-dialog'
          )
        ),
    );
  }
}
