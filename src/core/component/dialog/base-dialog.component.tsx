import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as R from 'ramda';

import { Button } from '../button';
import {
  calc,
  handlerPropsFactory,
  isAcceptable,
  isAcceptDisabled,
  isCheckModalNeeded,
  isClosable,
  isCloseDisabled,
  isConfirm,
  isDefault,
  isFn,
  isInline,
  isOverlay,
  isScrollable,
  joinClassName,
  mergeWithSystemProps,
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
   * @stable [11.05.2020]
   */
  public componentDidMount(): void {
    if (this.isOverlay) {
      this.domAccessor.addClassNamesToRootElement(DialogClassesEnum.OVERLAY_FILTER);
      this.activate();
    }
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

      const props = this.mergedProps;
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
    const props = this.mergedProps;

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
    return this.mergedProps.title;
  }

  /**
   * @stable [30.01.2020]
   * @returns {string}
   */
  protected get closeText(): string {
    return this.mergedProps.closeText || this.settings.messages.DIALOG_CANCEL;
  }

  /**
   * @stable [30.01.2020]
   * @returns {string}
   */
  protected get acceptText(): string {
    return this.mergedProps.acceptText || this.settings.messages.DIALOG_ACCEPT;
  }

  /**
   * @stable [05.01.2020]
   */
  private onCloseClick(): void {
    const props = this.mergedProps;

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

    const props = this.mergedProps;
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
    const props = this.mergedProps;

    this.setState({opened: false}, () => {
      if (this.isOverlay) {
        this.domAccessor.removeClassNamesFromRootElement(DialogClassesEnum.OVERLAY_FILTER);
      }
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
   * @stable [11.05.2020]
   * @returns {JSX.Element}
   */
  private get actionsElement(): JSX.Element {
    return (
      orNull(
        !this.isOverlay && (this.closable || this.acceptable),
        () => {
          const mergedProps = this.mergedProps;
          return (
            <div className={DialogClassesEnum.DIALOG_ACTIONS}>
              {
                orNull(
                  this.closable,
                  () => (
                    <Button
                      icon={IconsEnum.TIMES}
                      {...mergedProps.closeActionConfiguration}
                      disabled={isCloseDisabled(mergedProps)}
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
                      icon={IconsEnum.CHECK_CIRCLE}
                      raised={true}
                      {...mergedProps.acceptActionConfiguration}
                      disabled={isAcceptDisabled(mergedProps)}
                      onClick={this.onAcceptClick}>
                      {this.t(this.acceptText)}
                    </Button>
                  )
                )
              }
            </div>
          );
        }
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
        style={{width: calc<number>(this.mergedProps.width)}}
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
              {this.mergedProps.extraActions}
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
    return isAcceptable(this.mergedProps);
  }

  /**
   * @stable [06.01.2020]
   * @returns {boolean}
   */
  private get closable(): boolean {
    return isClosable(this.mergedProps);
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
    return !R.isNil(this.mergedProps.anchorElement);
  }

  /**
   * @stable [31.01.2020]
   * @returns {boolean}
   */
  private get isInline(): boolean {
    return isInline(this.mergedProps);
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isDefault(): boolean {
    return isDefault(this.mergedProps);
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isOverlay(): boolean {
    return isOverlay(this.mergedProps);
  }

  /**
   * @stable [11.03.2020]
   * @returns {boolean}
   */
  private get isConfirm(): boolean {
    return isConfirm(this.mergedProps);
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isModal(): boolean {
    return (!this.isInline && !this.isAnchored) || this.isOverlay;
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get hasExtraActions(): boolean {
    return !R.isNil(this.mergedProps.extraActions);
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get isScrollable(): boolean {
    return isScrollable(this.mergedProps);
  }

  /**
   * @stable [16.03.2020]
   * @returns {GenericPluginCtorT[]}
   */
  private get wrapperPlugins(): GenericPluginCtorT[] {
    return this.isScrollable ? [PerfectScrollPlugin] : [];
  }

  /**
   * @stable [11.05.2020]
   * @returns {string}
   */
  private get dialogClassName(): string {
    const mergedProps = this.mergedProps;

    return joinClassName(
      calc<string>(mergedProps.className),
      DialogClassesEnum.DIALOG,
      this.isOverlay && DialogClassesEnum.OVERLAY_DIALOG,
      this.isModal && DialogClassesEnum.MODAL_DIALOG,
      !this.isOverlay && (
        joinClassName(
          this.isDefault && DialogClassesEnum.DEFAULT_DIALOG,
          this.isConfirm && DialogClassesEnum.CONFIRM_DIALOG,
          this.isAnchored
            ? DialogClassesEnum.ANCHORED_DIALOG
            : DialogClassesEnum.NOT_ANCHORED_DIALOG,
          this.isInline
            ? DialogClassesEnum.INLINE_DIALOG
            : (
              !this.isAnchored && (
                this.doesAnotherModalDialogOpen
                  ? DialogClassesEnum.TRANSPARENT_DIALOG
                  : DialogClassesEnum.NOT_TRANSPARENT_DIALOG
              )
            ),
        )
      )
    );
  }

  /**
   * @stable [11.05.2020]
   * @returns {TProps}
   */
  private get mergedProps(): TProps {
    return mergeWithSystemProps(this.props, this.settings.components.dialog) as TProps;
  }
}
